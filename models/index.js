'use strict';
const {Users} = require('./userModel')
const {Clients} = require('./clientModel')
const {AWS} = require('./destinations/awsModel')
const {Segment} = require('./destinations/segModel')
const {Destinations} = require('./destinations')
module.exports = {Users, Clients, Segment, AWS, Destinations};