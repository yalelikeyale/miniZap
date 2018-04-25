'use strict';

const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
	segment_write:{type:String, required:true},
	company:{type:String, required:true}
});

const Segment = mongoose.model('segment', segmentSchema);

module.exports = {Segment};