'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  company_name:  {type: String, required: true},
  password:  {type: String, required: true},
  token:{type:String, default:''}
});

usersSchema.methods.serialize = function() {
  return {
    first_name: this.first_name,
    last_name: this.last_name,
    company_name: this.company_name
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