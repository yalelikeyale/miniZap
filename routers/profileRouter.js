'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Clients} = require('../models');

const profileRouter = express.Router();
const jsonParser = bodyParser.json();

profileRouter.use( jsonParser );

profileRouter.get('/:company/account', (req, res) => {
  console.log(__dirname)
  // res.sendFile('/Users/WiseYale/Desktop/thinkful/capstones/node-capstone/miniZap/public/profiles/index.html');
  res.sendFile('index.html', {"root": "./public/profiles"});
});


module.exports = {profileRouter};