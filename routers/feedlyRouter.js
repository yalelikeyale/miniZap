const express = require('express');
const feedlyRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request-promise')
const feedly_secret = process.env.feedly_secret
const oAuth = 'OAuth '+feedly_secret;


const extractEntries = (entryId)=>{
	console.log(entryId)
	entryId = encodeURI(entryId)
	const options = {
		uri:`http://cloud.feedly.com/v3/entries/${entryId}`,
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
		uri:'http://cloud.feedly.com/v3/streams/ids?streamId=feed/http://feeds.emarketer.com/TotalAccess_Articles.xml',
		headers:{
			Authorization: oAuth
		},
		json:true
	}
	request.get(options).then(response=>{
		const entries = response.ids.map(extractEntries)
		return Promise.all(entries)
			.then(responses=>{
				return responses
			})
			.catch(err=>{
				console.log(err);
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





