'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {Sources,Destinations,Users} = require('../models');

const connectionsRouter = express.Router();
const jsonParser = bodyParser.json();

connectionsRouter.use(jsonParser);

const jwtAuth = passport.authenticate('jwt', { session: false });

//need access to the users id possibly stored as session data? cookies?
//current set up for username but would like to replace with id
connectionsRouter.post('/',jwtAuth,(req,res)=>{
	let {user_name, source_name, api_key='', secret=''} = req.body
	console.log(user_name, source_name, api_key, secret);

	Users.find({"username":user_name})
		.count()
		.then(count=>{
			console.log('made it to check if user is in users table: ', count)
			if(!(count===1)){
	          return Promise.reject({
	            code: 422,
	            reason: 'ValidationError',
	            message: 'Source Already Selected',
	            location: 'source_name'
	          });				
			}
		})
		.catch(error=>{
			console.log('line 31')
			console.log(error);
		})
	Sources.find({user_name, source_name})
		.count()
		.then(count=>{
	        if((count>0)){
	          return Promise.reject({
	            code: 422,
	            reason: 'ValidationError',
	            message: 'Source Already Selected',
	            location: 'source_name'
	          });
	        }
	        return null
		})
		.then(()=>{
			Sources.create({
				user_name, 
				source_name, 
				api_key, 
				secret
			})
			  .then(newUserSource=>{console.log(newUserSource)})
			  .catch(error=>{console.log(error)});
		})
		.then(()=>{
			let {destination, api_key='',api_secret='',host='',database='',port='',username='',password=''} = req.body.connection
			Destinations.find({user_name, source_name, destination})
				.count()
				.then(count=>{
			        if((count>0)){
			          return Promise.reject({
			            code: 422,
			            reason: 'ValidationError',
			            message: 'Source Already Selected',
			            location: 'source_name'
			          });
			        }
			        return null	
				})
				.then(()=>{
					Destinations.create({
						user_name, 
						source_name, 
						destination, 
						api_key, 
						api_secret, 
						host, 
						database, 
						port, 
						username, 
						password
					})
				      .then(newUserDestination=>{res.status(201).send(newUserDestination)});
				})
				.catch(error=>{console.log(error)})
		})
		.catch(error=>{
			console.log(error);
		})
});

module.exports = {connectionsRouter};
