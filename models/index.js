'use strict';
const {Users} = require('./userModel')
const {Podio} = require('./sources/podioModel')
const {Pilot} = require('./destinations/autopilotModel')
const {AWS} = require('./destinations/awsModel')
const {Segment} = require('./destinations/segModel')
const {Destinations} = require('./destinations')
module.exports = {Users, Podio, Pilot, Segment, AWS, Destinations};