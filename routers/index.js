'use strict';
const {loginRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {podioRouter} = require('./podioRouter');
const {feedlyRouter} = require('./feedlyRouter');
const {connectionsRouter} = require('./connectionsRouter');
module.exports = {loginRouter, userRouter, podioRouter, feedlyRouter, connectionsRouter};