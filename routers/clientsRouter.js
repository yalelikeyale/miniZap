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
  console.log('made it inside of create new client router')
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

clientRouter.delete('/:id', jwtAuth, (req,res)=>{
  let _id = req.params.id 
  if(!(_id)){
    res.status(400).send('Please Enter a Valid companyname');
  }
  Clients.find({_id})
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
        Clients.find({_id})
          .remove()
          .then(()=>{
            res.status(201).send('Company Deleted');
          });
      })
});

//put to update a user ie. change password/ permissions
clientRouter.put('/:_id',(req,res)=>{
  let _id = req.params._id;
  const {company} = req.body
  if(!(_id && _id.length > 6)){
    res.status(400).send('Please Enter a Valid _id');
  }
  const updateableFields = ['company'];
  const updated = {};
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  return Clients.find({_id})
      .count()
      .then(count => {
        if(!(count===1)){
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: '_id not Found',
            location: '_id'
          });
        }
        return null
      })
      .then(()=>{
        Clients.findOneAndUpdate({_id},{ $set: updated }, { new: true })
        .then(updatedClient => {console.log(updatedClient); res.status(201).json(updatedClient)})
        .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
});

clientRouter.get('/', jwtAuth, (req, res) => {
  Clients.find()
    .then(companies => res.json(companies))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


module.exports = {clientRouter};