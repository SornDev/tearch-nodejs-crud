const express = require('express')
const app = express()


  // ການຮັບໂຕແປງແບບ ຜ່ານ get ຈະມີຢູ່ 2 ແບບຄື: ແບບ param ແລະ ແບບ query string
  // get param  -------------------------------
  app.get('/say/:name', (req, res) => {
    res.send(`hello:  ${req.params.name}`)
  })

  app.get('/say2/:name/:age', (req, res) => {
    res.send(`hello:  ${req.params.name}, age: ${req.params.age}`)
  })

  // get query string -------------------------------
  app.get('/search?name=macbook?year=2017', (req, res) => {
    res.send(`Macbook Pro:  ${req.query.name}, year: ${req.query.year}`)
  })

// app.listen(3000)

app.listen(3000,  () => {
    console.log('Example app listening on port 3000!')
    });
    