'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Users, Podio, Pilot} = require('../models');
const {destLookUp} = require('../libraries/destinationTree')
const {checkDestination} = require('../middleware')

const connectionsRouter = express.Router();
const jsonParser = bodyParser.json();

connectionsRouter.use(jsonParser);

//to access with jwtauth, you need to pass a users jwt token with the header Authorization + value of Bearer {jwttoken}
const jwtAuth = passport.authenticate('jwt', { session: false });


connectionsRouter.post('/podio', [jwtAuth,checkDestination], (req,res)=>{
	const {app_id, app_token, bot_id, podio_secret, podio_access} = req.body
	const company = req.user.company_name

	Podio.find({company, bot_id})
			.count()
			.then(count=>{
				if(count>1){
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
					const newDestObj = Object.assign({source:'podio'}, req.body[req.destination])
					destLookUp[req.destination](newDestObj)
				}
			})
			.then(newDest=>{res.status(201).json(newDest)})
		    .catch(err => {
		      if (err.reason === 'ValidationError') {
		        return res.status(err.code).json(err);
		      }
		      res.status(500).json({code: 500, message: 'Internal server error'});
		    });
})

module.exports = {connectionsRouter};
