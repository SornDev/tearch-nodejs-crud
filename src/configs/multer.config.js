const multer = require('multer');
const fs = require('fs');

exports.keyUpload = 'image'; // key ໃຊ້ເພື່ອອັບໂຫລດຮູບພາບ image ນີ້ກໍ່ຈະແມ່ນຊື່ຂອງ input ທີ່ສົ່ງເຂົ້າມາ

exports.config = {
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            const dir = './uploads';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            next(null, dir);
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1];
            next(null, `${file.fieldname}-${Date.now()}.${ext}`); 
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, next) => {
        const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({ message: "File Type not supported"}, false);

            // next(new Error('File Type not supported'), false);
        }
    }
}