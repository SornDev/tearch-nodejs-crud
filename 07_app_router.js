const express = require('express')
// border-parser ໃຊ້ກັບການຮັບຂໍ້ມູນຈາກ form
const bodyParser = require('body-parser')

// .env
require('dotenv').config()

// Server port
const port = process.env.PORT || 5000;

const cors = require('cors')
const corsOptions = {
    // origin: 'http://localhost:8080',
    origin: ['http://localhost:8080', 'http://localhost:8081','https://www.w3schools.com'],
    optionsSuccessStatus: 200
}

//require global black list
require('./src/global/blacklist.global');


const app = express()

// CORS ---
app.use(cors(corsOptions))
// end CORS ---

// path image static
app.use('/images', express.static('uploads'))

// ນຳໃຊ້ border-parser ເພື່ອຮັບຂໍ້ມູນຈາກ form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// product router
app.use(require('./src/routes/routes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    });
    