const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const segmentRouter  = require('./routers/segmentRouter');
const podioRouter  = require('./routers/podioRouter');
const mongoose = require('mongoose');
const config = require('dotenv').config()
const PORT = process.env.PORT || 8080;
const MLAB_URI = process.env.MLAB_URI;


const app = express();

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(MLAB_URI, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
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
	runServer().catch(err => console.error(err));
};

app.use([morgan('common'),bodyParser.urlencoded({ extended: false }),bodyParser.json(),express.static('public')])

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/segment', segmentRouter);
app.use('/podio', podioRouter);

module.exports = {app, runServer, closeServer};




