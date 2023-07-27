const express = require('express')
const app = express()


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
    new Product(4, 'Macbook Pro 2020', 5000),
    new Product(5, 'Macbook Pro 2021', 6000),
]

// get product all
app.get('/products', (req, res) => {
    res.send(products)
})

// get product by id
app.get('/products/:id', (req, res) => {
    let id = req.params.id
    let product = products.find(item => item.id == id)
    if(!product){
        // res.send('Not found')
        res.status(404).send('Not found')
    } else {
    res.json(product)
    }
})

// get product by name
app.get('/products/name/:name', (req, res) => {
    let name = req.params.name
    let product = products.find(item => item.name == name)
    res.json(product)
})



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    });
    