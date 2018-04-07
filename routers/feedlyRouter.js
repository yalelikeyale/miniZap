const express = require('express');
const feedlyRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request-promise')
const feedly_secret = process.env.feedly_secret
const oAuth = 'OAuth '+feedly_secret;


const extractEntries = (subscriptionEntries)=>{
	const entryIds = subscriptionEntries.ids.map(encodeURI)
	const options = {
		uri:'http://cloud.feedly.com/v3/entries/.mget',
		headers:{
			Authorization: oAuth
		},
		body:entryIds,
		json:true
	}
	return request.post(options)
		.then(response=>{
			return response
		})
		.catch(error=>{
			console.log(error);
		})
}

const extractStreams = (subscription)=>{
	let streamId = subscription.id
	const options = {
		uri:'http://cloud.feedly.com/v3/streams/ids?streamId='+streamId,
		headers:{
			Authorization: oAuth
		},
		json:true
	}
	return request.get(options)
		.then(response=>{
			return response
		})
		.catch(error=>{
			console.log(error);
		})
}

feedlyRouter.get('/', jsonParser,(req,res)=>{
	const options = {
		uri:'http://cloud.feedly.com/v3/subscriptions',
	 	headers:{
			Authorization: oAuth
		},
		json:true
	}
	request.get(options).then(response=>{
		const streams = response.map(extractStreams)
		return Promise.all(streams)
			.then(responses=>{
				return responses
			})
			.catch(err=>{
				console.log(err);
			})
	})
	.then(responses=>{
		responses.forEach(response=>{
			const entries = responses.map(extractEntries);
			return Promise.all(entries)
				.then(responses=>{
					return responses
				})
		})
	})
	.then(responses=>{
		console.log(responses)
	})
	.catch(err=>{
		console.log(err);
	})
	res.status(200).send('request received');
});


module.exports = {feedlyRouter};




