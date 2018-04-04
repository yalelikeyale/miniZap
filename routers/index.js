'use strict';
const {loginRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {segRouter} = require('./segmentRouter');
module.exports = {loginRouter, userRouter, segRouter};