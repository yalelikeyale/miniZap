'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// this is our schema to represent a restaurant
const usersSchema = new mongoose.Schema({
  first_name:{type: String, default:''},
  last_name: {type: String, default:''},
  username:  {type: String, required: true},
  password:  {type: String, required: true},
  admin:     {type: Boolean, default: false}
});

usersSchema.methods.serialize = function() {
  return {
    first_name: this.first_name,
    last_name: this.last_name,
    username: this.username,
    admin: this.admin,
  };
}

usersSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

usersSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Users = mongoose.model('users', usersSchema);

module.exports = {Users};