const express = require('express')
// border-parser ໃຊ້ກັບການຮັບຂໍ້ມູນຈາກ form
const bodyParser = require('body-parser')

const app = express()

// ນຳໃຊ້ border-parser ເພື່ອຮັບຂໍ້ມູນຈາກ form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ສ້າງ class product ເພື່ອສະແດງຂໍ້ມູນຂອງສິນຄ້າ
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ສ້າງ array ສິນຄ້າ
let products = [
    new Product(1, 'Macbook Pro 2017', 2000),
    new Product(2, 'Macbook Pro 2018', 3000),
    new Product(3, 'Macbook Pro 2019', 4000),
]

// get product all
app.get('/products', (req, res) => {
    res.send(products)
})

// get product by id
app.get('/products/:id', (req, res) => {
    let id = req.params.id
    let product = products.find(item => item.id == id)
    res.json(product)
})

// get product by name
app.get('/products/name/:name', (req, res) => {
    let name = req.params.name
    let product = products.find(item => item.name == name)
    res.json(product)
})

// post add product
// ໃນ tunder client ໃຊ້ Form-encoder
// post ແບບທີ່ 1
app.post('/products', (req, res) => {
    // res.json(req.body.name)
    let id = products.length + 1
    let name = req.body.name
    let price = req.body.price
    let product = new Product(id, name, price)
    // status 201: created
    products.push(product)
    res.status(201).json(products)
})

// post ແບບທີ່ 2
app.post('/products2', (req, res) => {

    const { name, price } = req.body
    let id = products.length + 1
    let product = new Product(id, name, price)
    // status 201: created
    products.push(product)
    res.status(201).json(products)
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    });
    