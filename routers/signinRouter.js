'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Users} = require('../models')

const signinRouter = express.Router();

const createAuthToken = function(user) {
  console.log(user)
  return jwt.sign({user}, process.env.JWT_SECRET, {
    subject: user.toString(),
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
signinRouter.use(bodyParser.json());


const jwtAuth = passport.authenticate('jwt', {session: false});


// The user provides a company_name and password to login
signinRouter.post('/', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user._id);
  const company_name = req.user.company_name
  const updated = {"token":authToken}
  res.status(201).json(updated)
})

// The user exchanges a valid JWT for a new one with a later expiration
signinRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {signinRouter};