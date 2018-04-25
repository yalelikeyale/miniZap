'use strict';

const mongoose = require('mongoose');

const awsSchema = new mongoose.Schema({
	access_key:{type:String, required:true},
	secret_key:{type:String, required:true},
	company:{type:String, required:true}
});

const AWS = mongoose.model('aws', awsSchema);

module.exports = {AWS};