const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')

// login    
// router.post('/login', UserController.login)

// check auth   
router.get('/check_auth', auth, UserController.check_auth)

// get user all
router.get('/', auth, UserController.getUsers)

// get user by id
router.get('/:id', auth, UserController.getUserById)

// post add user
router.post('/', auth, UserController.createUser)

// post add register
router.post('/register', UserController.createUser)

// put update user by id
router.put('/:id', auth, UserController.updateUser)

// delete user by id
router.delete('/:id',auth, UserController.deleteUser)

module.exports = router