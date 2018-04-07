'use strict';
const {loginRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {segmentRouter} = require('./segmentRouter');
const {podioRouter} = require('./podioRouter');
const {feedlyRouter} = require('./feedlyRouter');
const {connectionsRouter} = require('./connectionsRouter');
module.exports = {loginRouter, userRouter, segmentRouter, podioRouter, feedlyRouter, connectionsRouter};