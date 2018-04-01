'use strict';
const {loginRouter} = require('./signinRouter');
const {podRouter} = require('./podioRouter');
const {userRouter} = require('./usersRouter');
const {segRouter} = require('./segmentRouter');
module.exports = {loginRouter, podRouter, userRouter, segRouter};