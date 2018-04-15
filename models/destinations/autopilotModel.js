'use strict';

const mongoose = require('mongoose');

const pilotSchema = new mongoose.Schema({
	pilot_key:{type:String, required:true},
	trigger:{type:String, required:true},
	source:{type:String, required:true},
	company:{type:String, required:true}
});

const Pilot = mongoose.model('autopilot', pilotSchema);

module.exports = {Pilot};