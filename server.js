const config = require('dotenv').config()
const PORT = process.env.PORT || 8080;
const MLAB_URI = process.env.MLAB_URI || 'mongodb://localhost/users';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const {segRouter, podRouter, registerRouter} = require('./routers');

const app = express();

let server;

function runServer(dbURI, port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbURI, err => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      }).on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
     })
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
	runServer(MLAB_URI,PORT).catch(err => console.error(err));
};

function corsMiddle(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
}

app.use([morgan('common'),bodyParser.urlencoded({ extended: false }),bodyParser.json(),express.static('public')],corsMiddle)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/users/registration',   registerRouter);
app.use('/segment',              segRouter);
app.use('/podio',                podRouter);

module.exports = {app, runServer, closeServer};




