'use strict';
const {loginRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {podioRouter} = require('./podioRouter');
const {feedlyRouter} = require('./feedlyRouter');
const {connectionsRouter} = require('./connectionsRouter');
const {autopilotRouter} = require('./autopilotRouter');
module.exports = {loginRouter, userRouter, podioRouter, feedlyRouter, connectionsRouter, autopilotRouter};