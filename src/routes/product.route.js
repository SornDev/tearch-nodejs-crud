const router = require('express').Router();

const ProductController = require('../controllers/product.controller')

const auth = require('../middlewares/auth.middleware')

// get product all
router.get('/', auth, ProductController.getProducts)

// get product by id
router.get('/:id', auth, ProductController.getProductById)

// get product by name
router.get('/name/:name', auth, ProductController.getProductByName)

// post add product

// post ແບບທີ່ 2
router.post('/', auth, ProductController.addProduct)

// put update product by id 
router.put('/:id', auth, ProductController.updateProduct)

// delete product by id
router.delete('/:id', auth, ProductController.deleteProduct)

module.exports = router;