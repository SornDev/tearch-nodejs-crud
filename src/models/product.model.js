const dbConn = require('../configs/db.config');

class Product {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}


Product.create = (newProduct, result) => {
    // create product table if not exist
    
    dbConn.query('CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT, image VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err, res) => {
        if(err) return result(err, null)
        // console.log('create table products success')
    });

    dbConn.query('INSERT INTO products SET ?', newProduct, (err, res) => {
        if(err) return result(err, null)
        return result(null, res.insertId)
        
    });
}

Product.findById = (id, result) => {
    dbConn.query('SELECT * FROM products WHERE id = ?', id, (err, res) => {
        if(err) return result(err, null)
        return result(null, res)
    });
}

Product.findByName = (name, result) => {
    dbConn.query('SELECT * FROM products WHERE name = ?', name, (err, res) => {
       if(err) return result(err, null)
         return result(null, res)
    });

}

Product.findAll = (result) => {
    dbConn.query('SELECT * FROM products', (err, res) => {
       if(err) return result(err, null)
        return result(null, res)
    });
}

Product.update = (id, product, result) => {
    dbConn.query('UPDATE products SET name=?, price=?, image=? WHERE id=?', [product.name, product.price, product.image, id], (err, res) => {
        if(err) return result(err, null)
        return result(null, res)
    });
}

Product.delete = (id, result) => {
    dbConn.query('DELETE FROM products WHERE id=?', [id], (err, res) => {
        if(err) return result(err, null)
        return result(null, res)
    });
}

module.exports = Product;