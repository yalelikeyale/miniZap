'use strict';
const {signinRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {podioRouter} = require('./podioRouter');
const {feedlyRouter} = require('./feedlyRouter');
const {connectionsRouter} = require('./connectionsRouter');
const {autopilotRouter} = require('./autopilotRouter');
const {segmentRouter} = require('./segmentRouter');
module.exports = {signinRouter, userRouter, podioRouter, feedlyRouter, connectionsRouter, autopilotRouter, segmentRouter};