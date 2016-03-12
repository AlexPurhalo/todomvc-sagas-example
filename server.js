var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var Datastore = require('nedb')
var db = new Datastore()
var bodyParser = require('body-parser')


var app = new express()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post("/add-todo", function(req, res) {
  console.log('received todo:', req.body.text)

  db.insert([{ text: req.body.text }], function (err, newDocs) {
    res.send(newDocs[0])
  });
})

app.post("/edit-todo", function(req, res) {
  console.log('received todo edit request:', req.body.id, req.body.text)

  db.update({ _id: req.body.id }, {text: req.body.text}, { returnUpdatedDocs: true },  function (err, numAffected, doc, upsert) {
    
    res.send({ text: doc.text, id: doc._id })
  });
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
