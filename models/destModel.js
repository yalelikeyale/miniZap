'use strict';

const mongoose = require('mongoose');


const destSchema = new mongoose.Schema({
  source_name:{type: String, required:true},
  destination:{type: String, required:true},
  user_name:{type: String, required:true},
  api_key:{type: String, default:''},
  api_secret:{type: String, default:''},
  host:{type: String, default:''},
  database:{type: String, default:''},
  port:{type: Number, default:''},
  username:{type: String, default:''},
  password:{type: String, default:''}
});

const Destinations = mongoose.model('destinations', destSchema);

module.exports = {Destinations};