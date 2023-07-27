
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// login    
exports.login = (req, res) => {
    // console.log(req.body);
    User.login(req.body, (err, token) => {

        if (err) return res.status(200).json({ sussess: false, message: err.message })
        if (token) return res.status(200).json({ sussess: true, token })
    })
}

// logout
exports.logout = (req, res) => {
    User.logout(req, (err, result) => {
        if (err) return res.status(200).json({ sussess: false, message: err.message })
        res.status(200).json({ sussess: true, message: 'Logout success' })
    })
}

// check auth
exports.check_auth = (req, res) => {
    User.check_auth(req, (err, decoded) => {
        if (err) return res.status(200).json({ sussess: false, message: err.message })
        if (decoded) return res.status(200).json({ sussess: true, decoded: decoded })
    })
}

// get user all
exports.getUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        res.json(users)

    })
}

// get user by id
exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        if (!user) return res.status(404).json({ sussess: false, message: 'Not found' })
        res.json({ sussess: true, user })
    })
}

// create user bcrypt
exports.createUser = (req, res) => {
    const newUser = new User(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).json({ sussess: false, message: 'Please fill all field' })
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ sussess: false, message: err.message })
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ sussess: false, message: err.message })
                newUser.password = hash
                User.create(newUser, (err, user) => {
                    if (err) return res.status(500).json({ sussess: false, message: err.message })
                    res.json({ sussess: true, message: 'User created' })
                })
            })
        })
    }
}

// create user
// exports.createUser = (req, res) => {
//     const newUser = new User(req.body)
//     if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//         return res.status(400).json({ sussess: false, message: 'Please fill all field' })
//     } else {

//         User.create(newUser, (err, user) => {
//             if (err) return res.status(500).json({ sussess: false, message: err.message })
//             res.json({ sussess: true, message: 'User created' })
//         })
//     }
// }

// update user by id
exports.updateUser = (req, res) => {
    const updateUser = new User(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).json({ sussess: false, message: 'Please fill all field' })
    } else {
        User.update(req.params.id, updateUser, (err, user) => {
            if (err) return res.status(500).json({ sussess: false, message: err.message })
            res.json({ sussess: true, message: 'User updated' })
        })
    }
}

// delete user by id
exports.deleteUser = (req, res) => {
    User.delete(req.params.id, (err, message) => {
        if (err) return res.status(500).json({ sussess: false, message: err.message })
        if(message) return res.status(404).json({ sussess: false, message: message })
        res.json({ sussess: true, message: 'User deleted' })
    })
}


