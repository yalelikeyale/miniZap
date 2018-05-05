'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Clients} = require('../models');

const profileRouter = express.Router();
const jsonParser = bodyParser.json();

profileRouter.use( jsonParser );

profileRouter.get('/:company/account', (req, res) => {
  console.log('made it into profile router get request')
  res.sendFile('/Users/WiseYale/Desktop/thinkful/capstones/node-capstone/miniZap/public/profiles/index.html');
});


module.exports = {profileRouter};