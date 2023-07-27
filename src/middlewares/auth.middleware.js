const jwt = require('jsonwebtoken')

// .env
require('dotenv').config()

module.exports = (req, res, next) => {
    console.log(global.blacklist);
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer <token>
        console.log(token)
        if(!token) return res.status(401).json({ message: 'Auth failed' })
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userData = decoded
        // check token blacklist
        if (global.blacklist.includes(token))
        return res.status(401).json({ message: 'Auth failed' })
        next()
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        })
        
    }
};