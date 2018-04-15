'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Users} = require('../models')

const signinRouter = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, process.env.JWT_SECRET, {
    subject: user.company_name,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
signinRouter.use(bodyParser.json());


// The user provides a company_name and password to login
signinRouter.post('/', localAuth, (req, res) => {
  console.log('made it through local auth')
  const authToken = createAuthToken(req.user.serialize());
  const company_name = req.user.company_name
  const updated = {"token":authToken}
  Users.findOneAndUpdate({company_name},{ $set: updated }, { new: true })
  	.then(updatedUser=>{res.json(authToken)})
  	.catch(err=>{res.status(500).send('Failed to provide user token')})
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
signinRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {signinRouter};