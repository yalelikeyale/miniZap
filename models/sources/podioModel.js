'use strict';

const mongoose = require('mongoose');

const podioSchema = new mongoose.Schema({
	app_id:{type:Number, required:true},
	app_token:{type:String, required:true},
	bot_id:{type:String, required:true},
	podio_secret:{type:String, required:true},
	podio_access:{type:String, required:true},
	company:{type:String, required:true}
});

const Podio = mongoose.model('podio', podioSchema);

module.exports = {Podio};