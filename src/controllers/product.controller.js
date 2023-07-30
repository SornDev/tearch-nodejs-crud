

const multer = require('multer')
const multerConfig = require('../configs/multer.config')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)
const Product = require('../models/product.model')
const fs = require('fs')
const path = require('path')

// ສ້າງ class product ເພື່ອສະແດງຂໍ້ມູນຂອງສິນຄ້າ
// class Product {
//     constructor(id, name, price, image) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//         this.image = image
//     }
// }

// ສ້າງ array ສິນຄ້າ
// let products = [
//     new Product(1, 'Macbook Pro 2017', 2000,''),
//     new Product(2, 'Macbook Pro 2018', 3000,''),
//     new Product(3, 'Macbook Pro 2019', 4000,''),
// ]



// get product all
exports.getProducts = (req, res) => {
    Product.findAll((err, products) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        res.json(products)

    })
}

// get product by id
exports.getProductById = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        if (!product) return res.status(404).json({ sussess: false, message: 'Not found' })
        res.json(product)
    })
}

// get product by name
exports.getProductByName = (req, res) => {
    Product.findByName(req.params.name, (err, product) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        if (!product) return res.status(404).json({ sussess: false, message: 'Not found' })
        res.json({ sussess: true, product })
    })
}

// post add product
exports.addProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ sussess: false, message: err.message })
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        const newProduct = new Product(req.body)
        // log(newProduct);
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(400).json({ sussess: false, message: 'Please fill all field' })
        } else {
            Product.create(newProduct, (err, product) => {
                if (err) return res.status(500).send({ sussess: false, message: err.message })
                res.status(201).json({ sussess: true, message: 'Product added', product })
            })
        }
    })
}


// put update product by id 
exports.updateProduct = (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ sussess: false, message: err.message })
        }

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(400).json({ sussess: false, message: 'Please fill all field' })
        } else {

            // delete old image file
            if (req.file) {
                Product.findById(req.params.id, (err, product) => {
                    if (err) return res.status(500).json({ sussess: false, message: err.message })
                    if (product.length > 0 && product[0].image) {
                        const filePath = path.join(__dirname, '../../uploads/' + product[0].image)
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath)
                        }
                    }
                })
                req.body.image = req.file.filename
            }
            Product.update(req.params.id, new Product(req.body), (err, product) => {
                if (err) return res.status(500).send({ sussess: false, message: err.message })
                res.status(201).json({ sussess: true, message: 'Product updated' })
            })

        }
    })


}
// delete product by id
exports.deleteProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        //   console.log(product.length);
        //   res.json(product[0].image)
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        if (product.length > 0 && product[0].image) {
            const filePath = path.join(__dirname, '../../uploads/' + product[0].image)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }
    })

    Product.delete(req.params.id, (err, product) => {
        if (err) return res.status(500).send({ sussess: false, message: err.message })
        res.status(201).json({ sussess: true, message: 'Product deleted' })
    })
}
