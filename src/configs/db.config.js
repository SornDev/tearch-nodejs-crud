const mysql = require('mysql');

// .env
require('dotenv').config();

const db = mysql.createConnection({
    host:       process.env.DB_HOST,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
    database:   process.env.DB_DATABASE,
});


// const db = mysql.createConnection({
//     host:       'localhost',
//     user:       'root',
//     password:   '',
//     database:   'nodejs',
// });

db.connect((err) => {
    if (err) 
    console.log(err.sqlMessage);
    // throw err;
    console.log('Connect database success!');
});

module.exports = db;