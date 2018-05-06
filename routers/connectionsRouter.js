'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Users, Podio, Segment, Destinations} = require('../models');
const {destLookUp} = require('../gateWays')
const {checkClients,checkConnectionRequest} = require('../middleware')

const connectionsRouter = express.Router();
const jsonParser = bodyParser.json();

connectionsRouter.use(jsonParser);

const jwtAuth = passport.authenticate('jwt', { session: false });

//a failure in any of the checks and balances isn't stopping data from being uploaded. need to add reject promises to stop the chain

connectionsRouter.post('/woocom', [jwtAuth, checkClients, checkConnectionRequest], (req,res)=>{
	const source = 'woocomm'
    const {company} = req.body
	Destinations.find({company, source})
			.count()
			.then(count=>{
				if(count>0){
		          return Promise.reject({
		            code: 422,
		            reason: 'ValidationError',
		            message: 'Duplicate Source Request. Please delete current configuration if you wish to continue'
		          });				
				}
				const newDestObj = Object.assign({company}, req.body[req.destination])
				return destLookUp[req.destination](newDestObj)
			})
			.then(()=>{
				Destinations.create({
					company,
					source,
					destination:req.destination
				})
				.then(newDestConnection=>{
					res.status(201).json(newDestConnection)
				})
				.catch(err=>{console.log(err)})
			})
		    .catch(err => {
		      console.log('In connections router catch statement')
		      if (err.reason === 'ValidationError') {
		        return res.status(err.code).json(err);
		      }
		      res.status(500).json({code: 500, message: 'Internal server error'});
		    });
})

module.exports = {connectionsRouter};






