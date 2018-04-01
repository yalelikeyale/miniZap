'use strict';
const {podRouter} = require('./podioRouter');
const {registerRouter} = require('./registrationRouter');
const {segRouter} = require('./segmentRouter');
module.exports = {podRouter, registerRouter, segRouter};