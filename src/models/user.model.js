const dbConn = require('../configs/db.config');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');

// .env
require('dotenv').config()

class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}

User.login = (user, result) => {
    // console.log(user);
    dbConn.query('SELECT * FROM users WHERE email = ?', user.email, (err, res) => {
        if (err) return result(err, null)
        if (res.length > 0) {
            bcrypt.compare(user.password, res[0].password, (err, isMatch) => {
                if (err) return result(err, null)
                if (isMatch) {
                    const token = jwt.sign({ id: res[0].id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
                    return result(null, token)
                } else {
                    return result({ message: 'Password incorrect' }, null)
                }
            })
        } else {
            return result({ message: 'Email not found' }, null)
        }
    });


    checkTokenbacklist()

}

// check token blacklist
function checkTokenbacklist() {

    // show list array
    for (let i = 0; i < global.blacklist.length; i++) {
        console.log(global.blacklist[i]);
        // verify token expired remove token in blacklist
        jwt.verify(global.blacklist[i], process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                global.blacklist.splice(i, 1);
            }
        })
    }
}





// logout   
User.logout = (req, result) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            result(err, null)
        } else {
            global.blacklist.push(token);
            result(null, decoded)
        }
    });
    console.log(global.blacklist);
}
// logout

User.check_auth = (req, result) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return result(err, null)
        return result(null, decoded)

    })
}


User.create = (newUser, result) => {
    // create user table if not exist
    dbConn.query('CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err, res) => {
        if (err) return result(err, null)
        // console.log('create table users success')
    });

    dbConn.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) return result(err, null)
        return result(null, res.insertId)
    });
}

User.findById = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id = ?', id, (err, res) => {
        if (err) return result(err, null)
        return result(null, res)
    });
}

User.findAll = (result) => {
    dbConn.query('SELECT id, username, email, created_at, updated_at FROM users', (err, res) => {
        if (err) return result(err, null)
        return result(null, res)
    });
}

User.update = (id, user, result) => {
    dbConn.query('UPDATE users SET username=?, password=?, email=? WHERE id=?', [user.username, user.password, user.email, id], (err, res) => {
        if (err) return result(err, null)
        return result(null, res)
    });
}

User.delete = (id, result) => {

    // check user exist
    dbConn.query('SELECT * FROM users WHERE id = ?', id, (err, res) => {
        if (err) return result(err, null)
        if (res.length > 0) {
            // delete user

            dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res) => {
                if (err) return result(err, null)
                return result(null, null)
            });
        } else {
            return result(null, { message: 'User not found' })
        }
    });
}

module.exports = User;