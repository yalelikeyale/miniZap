'use strict';

const mongoose = require('mongoose');

const destSchema = new mongoose.Schema({
	source:{type:String, required:true},
	company:{type:String, required:true},
	destination:{type:String, required:true}
});

const Destinations = mongoose.model('destinations', destSchema);

module.exports = {Destinations};