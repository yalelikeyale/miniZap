'use strict';
const {AutoPilotConstructor} = require('./autopilotLib')
const {dynamoFactory} = require('./awsFactory.js')
const {segmentFactory} = require('./segmentFactory.js')
module.exports = {AutoPilotConstructor,dynamoFactory,segmentFactory};