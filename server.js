const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT } = require('./config/config');
const wooRouter  = require('./routers/wooRouter');
const config = require('dotenv').config()

const app = express();

let server;

function runServer(port = PORT) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve();
    }).on('error', err => {
        reject(err);
      });
  });
}

function closeServer() {
  console.log('Closing server');
  server.close(err => {
    if (err) {
      return reject(err);
    }
    resolve();
  });
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
};

app.use([morgan('common'),bodyParser.urlencoded({ extended: true }),bodyParser.json(),express.static('public')])

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/woocom', wooRouter);

module.exports = {app, runServer, closeServer};




