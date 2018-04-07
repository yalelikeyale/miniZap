'use strict';

const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  user_name:{type: String, required:true},
  source_name:{type: String, required:true},
  api_key:{type: String, default:''},
  secret:{type: String, default:''}
});

const Sources = mongoose.model('sources', sourceSchema);

module.exports = {Sources};