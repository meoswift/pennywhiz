const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/planned', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/html/planned.html')))
  .get('/spent', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/html/spent.html')))
  .get('/remained', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/html/remained.html')))
  .get('/overview', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/html/overview.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
