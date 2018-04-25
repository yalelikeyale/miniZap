'use strict';

const mongoose = require('mongoose');

const awsSchema = new mongoose.Schema({
	access_key:{type:String, required:true},
	secret_key:{type:String, required:true},
	region:{type:String, required:true},
	bucket:{type:String, required:true},
	db_name:{type:String, required:true},
	user:{type:String, required:true},
	password:{type:String, required:true},
	host:{type:String, required:true},
	port:{type:Number, required:true},
	company:{type:String, required:true},
});

const AWS = mongoose.model('aws', awsSchema);

module.exports = {AWS};