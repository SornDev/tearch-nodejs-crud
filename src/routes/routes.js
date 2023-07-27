const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')
// login
router.post('/login', UserController.login)
// lgout
router.get('/logout',auth, UserController.logout)

router.use('/products', require('./product.route'))
router.use('/users', require('./user.route'))

module.exports = router