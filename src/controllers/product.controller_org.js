

const multer = require('multer')
const multerConfig = require('../configs/multer')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)



// ສ້າງ class product ເພື່ອສະແດງຂໍ້ມູນຂອງສິນຄ້າ
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image
    }
}

// ສ້າງ array ສິນຄ້າ
let products = [
    new Product(1, 'Macbook Pro 2017', 2000,''),
    new Product(2, 'Macbook Pro 2018', 3000,''),
    new Product(3, 'Macbook Pro 2019', 4000,''),
]



// get product all
exports.getProducts = (req, res) => res.json(products)

// get product by id
exports.getProductById = (req, res) => {
    const result = products.find(item => item.id == req.params.id)
    if (result) {
        res.json(result)
    } else {
        res.status(404).send('Not found')
    }
}

// get product by name
exports.getProductByName = (req, res) => {
    const result = products.find(item => item.name == req.params.name)
    if (result) {
        res.json(result)
    } else {
        res.status(404).send('Not found')
    }
} 

// post add product
exports.addProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        let id = products.length + 1
        let product_new = new Product(id, req.body.name, req.body.price, req.file?req.file.filename:'')
        products.push(product_new)
        res.status(201).json(products)
    })
}


// put update product by id 
exports.updateProduct = (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }

        const index = products.findIndex(item => item.id == req.params.id)
        // delete old image file
        if(req.file) {
            if(products[index].image) {
            const fs = require('fs')
            const path = require('path')
            const filePath = path.join(__dirname, '../../uploads/'+products[index].image)
            fs.unlinkSync(filePath)
            }
        }

        if (index >= 0) {
            const { name, price } = req.body
            products[index].name = name
            products[index].price = price
            products[index].image = req.file?req.file.filename:products[index].image   
            res.json(products)
        } else {
            res.status(404).send('Not found')
        }
    })


}
// delete product by id
exports.deleteProduct = (req, res) => {
    const index = products.findIndex(item => item.id == req.params.id)
    if (index >= 0) {
         // delete old image file
         if(products[index].image) {
            const fs = require('fs')
            const path = require('path')
            const filePath = path.join(__dirname, '../../uploads/'+products[index].image)
            fs.unlinkSync(filePath)
        }
        products.splice(index, 1)
       
        res.json(products)
    } else {
        res.status(404).send('Not found')
    }
}
