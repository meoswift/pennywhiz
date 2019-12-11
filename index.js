const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/app', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/app.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
