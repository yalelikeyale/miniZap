'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Users, Podio, Segment, Destinations} = require('../models');
const {destLookUp} = require('../gateWays')
const {checkConnectionRequest} = require('../middleware')

const connectionsRouter = express.Router();
const jsonParser = bodyParser.json();

connectionsRouter.use(jsonParser);

//to access with jwtauth, you need to pass a users jwt token with the header Authorization + value of Bearer {jwttoken}
const jwtAuth = passport.authenticate('jwt', { session: false });


connectionsRouter.post('/podio', [jwtAuth, checkConnectionRequest], (req,res)=>{
	const {app_id, app_token, bot_id, podio_secret, podio_access} = req.body
	const company = req.user
	Podio.find({company, bot_id})
			.count()
			.then(count=>{
				if(count>0){
		          return Promise.reject({
		            code: 422,
		            reason: 'ValidationError',
		            message: 'Duplicate Source Request. Please delete current configuration if you wish to continue'
		          });				
				}
				return Podio.create({
					app_id,
					app_token,
					bot_id,
					podio_secret,
					podio_access,
					company
				})
				.then(newPodio=>{
					return newPodio
				})
				.catch(err=>{
					res.status(500).send('Internal Server Error');
				})
			})
			.then(newPodio=>{
				if(newPodio){
					const newDestObj = Object.assign({company:company}, req.body[req.destination])
					destLookUp[req.destination](newDestObj)
				}
			})
			.then(newDest=>{
				Destinations.create({
					company:company,
					source:'podio',
					destination:req.destination
				})
				.then(newDestConnection=>{
					res.status(201).json(newDestConnection)
				})
				.catch(err=>{console.log(err)})
			})
		    .catch(err => {
		      if (err.reason === 'ValidationError') {
		        return res.status(err.code).json(err);
		      }
		      res.status(500).json({code: 500, message: 'Internal server error'});
		    });
})

connectionsRouter.post('/segment', [jwtAuth, checkConnectionRequest], (req,res)=>{
	const company = req.user
	const source = 'woocomm'

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
				destLookUp[req.destination](newDestObj)
			})
			.then(newDest=>{
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
		      if (err.reason === 'ValidationError') {
		        return res.status(err.code).json(err);
		      }
		      res.status(500).json({code: 500, message: 'Internal server error'});
		    });
})

module.exports = {connectionsRouter};
