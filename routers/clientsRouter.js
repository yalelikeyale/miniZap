'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Clients} = require('../models');

const clientRouter = express.Router();
const jsonParser = bodyParser.json();

//to access with jwtauth, you need to pass a companys jwt token with the header Authorization + value of Bearer {jwttoken}
const jwtAuth = passport.authenticate('jwt', { session: false });

clientRouter.use(jsonParser);

// Post to register a new company
clientRouter.post('/', jwtAuth, (req, res) => {
  const requiredFields = ['company'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    res.status(422).json({
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const explicityTrimmedFields = ['company'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    res.status(422).json({
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  let {company} = req.body;

  return Clients.find({company})
    .count()
    .then(count => {
      if (count > 0) {
        const error = {
          code: 422,
          reason: 'ValidationError',
          message: 'Company Already Exists'
        }
        Promise.reject(error);
      }
      return null
    })
    .then(() => {
      console.log(company)
      return Clients.create({ company });
    })
    .then(company => {
      return res.status(201).json(company.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
})

clientRouter.delete('/:company', jwtAuth, (req,res)=>{
  let company = req.params.company 
  if(!(company)){
    res.status(400).send('Please Enter a Valid companyname');
  }
  Clients.find({company})
      .count()
      .then(count => {
        if(!(count===1)){
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'companyname not Found',
            location: 'companyname'
          });
        }
        return null
      })
      .then(()=>{
        Clients.find({company})
          .remove()
          .then(()=>{
            res.status(201).send('Company Deleted');
          });
      })
});

clientRouter.get('/', jwtAuth, (req, res) => {
  console.log('get all clients function is being called')
  return Clients.find()
    .then(companies => res.json(companies))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


module.exports = {clientRouter};