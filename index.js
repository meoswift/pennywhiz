const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000


// MONGO CONNECTION
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://gmelcher:131313A@ds253428.mlab.com:53428/heroku_k05ffvws";
MongoClient.connect(uri, function (err, client) {
  // perform actions on the collection object
  // client.close();
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/app', (req, res) =>
                res.sendFile(path.join(__dirname, 'public/app.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
