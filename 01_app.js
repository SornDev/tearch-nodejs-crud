const express = require('express')
const app = express()

// http type: GET, POST, PUT, DELETE

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/say', function (req, res) {
    res.send('Hello World 2')
  })

// app.listen(3000)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    });
    