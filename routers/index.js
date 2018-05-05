'use strict';
const {signinRouter} = require('./signinRouter');
const {userRouter} = require('./usersRouter');
const {clientRouter} = require('./clientsRouter');
const {profileRouter} = require('./profileRouter');
const {connectionsRouter} = require('./connectionsRouter');
const {woocomRouter} = require('./woocomRouter');
module.exports = {signinRouter, userRouter, clientRouter, profileRouter, connectionsRouter, woocomRouter};