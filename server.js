const dotenv = require('dotenv')
dotenv.load()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/AminiaDB' , {useMongoClient : true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./api/routes/userRoutes.js');

userRoutes(app)

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Aminia is awake on port: ' + port);
