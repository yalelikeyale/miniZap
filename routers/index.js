'use strict';
const {signinRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {podioRouter} = require('./podioRouter');
const {connectionsRouter} = require('./connectionsRouter');
const {segmentRouter} = require('./segmentRouter');
module.exports = {signinRouter, userRouter, podioRouter, connectionsRouter, segmentRouter};