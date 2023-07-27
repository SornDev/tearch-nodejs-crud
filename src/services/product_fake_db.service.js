

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
exports.FindAll = products

// get product by id
exports.FindByID = (id) => {
    let product = products.find(item => item.id == id)
    if(!product) return null
    return product
}

// get product by name
exports.FindByName = (name) => {
    let product = products.find(item => item.name == name)
    if(!product) return null
    return product
}

// post add product
exports.add = (product,file) => {
    let id = products.length + 1
    let product_new = new Product(id, product.name, parseInt(product.price), file?file.filename:'')
    // status 201: created
    products.push(product_new)
    return products
}



// put update product by id 
exports.update = (id, product,file) => {
    const index = products.findIndex(item => item.id == id)
    
    // delete old image file
    if(file) {
        const fs = require('fs')
        const path = require('path')
        const filePath = path.join(__dirname, '../../uploads/'+products[index].image)
        fs.unlinkSync(filePath)
    }

    if (index >= 0) {
        products[index].name = product.name
        products[index].price = product.price
        products[index].image = file?file.filename:products[index].image // ກວດຊອບຖ້າມີການອັບໂຫລດຮູບພາບ ໃຫ້ຂຽນທັບ ແຕ່ຖ້າບໍ່ມີການອັບໂຫລດ ໃຫ້ດຶງຮູບເກົ່າມາແທນ
        return products 
    } 
    return null
}
// delete product by id
exports.remove = (id) => {
    const index = products.findIndex(item => item.id == id)
    if (index >= 0) {
        products.splice(index, 1)
        return true
    } 
    return false
}
