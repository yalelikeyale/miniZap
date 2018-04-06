'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Users} = require('../models');

const userRouter = express.Router();
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });

userRouter.use(jsonParser);
// Post to register a new user
userRouter.post('/',jwtAuth, (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password', 'first_name', 'last_name'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const booleanFields = ['admin'];
  const nonBooleanField = stringFields.find(
    field => {field in req.body && typeof req.body[field] !== 'boolean'}
  );

  if (nonBooleanField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected boolean',
      location: nonBooleanField
    });
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 6
    },
    password: {
      min: 10,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, first_name = '', last_name = '', admin} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  first_name = first_name.trim();
  last_name = last_name.trim();

  return Users.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return Users.hashPassword(password);
    })
    .then((hash) => {
      return Users.create({
        username,
        password: hash,
        first_name,
        last_name,
        admin
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

//put to update a user ie. change password/ permissions
userRouter.put('/:username',jwtAuth,(req,res)=>{
  let username = req.params.username;
  if(!(username && username.length > 6)){
    res.status(400).send('Please Enter a Valid Username');
  }
  const stringFields = ['username', 'password', 'first_name', 'last_name'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  const booleanFields = ['admin'];
  const nonBooleanField = stringFields.find(
    field => {field in req.body && typeof req.body[field] !== 'boolean'}
  );
  if (nonBooleanField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected boolean',
      location: nonBooleanField
    });
  }
  const updateableFields = ['username', 'password', 'admin'];
  const nonUpdateableField = updateableFields.find(
    field => {field in req.body}
  );
  if (nonUpdateableField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot update entered field',
      location: nonUpdateableField
    });
  }
  const updated = {};
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  return Users.find({username})
      .count()
      .then(count => {
        if(!(count===1)){
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username not Found',
            location: 'username'
          });
        }
        return null
      })
      .then(()=>{
        Users.findOneAndUpdate({username},{ $set: updated }, { new: true })
        .then(updatedUser => {res.status(201).json(updatedUser.serialize())})
        .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
});

userRouter.delete('/:username',jwtAuth,  (req,res)=>{
  let username = req.params.username 
  if(!(username && username.length>6)){
    res.status(400).send('Please Enter a Valid Username');
  }
  Users.find({username})
      .count()
      .then(count => {
        if(!(count===1)){
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username not Found',
            location: 'username'
          });
        }
        return null
      })
      .then(()=>{
        Users.find({username})
          .remove()
          .then(()=>{
            res.status(201).send('User Deleted');
          });
      })
});

userRouter.get('/',jwtAuth,(req, res) => {
  return Users.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});



module.exports = {userRouter};




