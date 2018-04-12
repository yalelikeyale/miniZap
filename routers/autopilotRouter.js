const express = require('express');
const autopilotRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


autopilotRouter.post('/contact-updated', jsonParser,(req,res)=>{
	console.log(req.body);
	res.status(201).end();
});

module.exports = {autopilotRouter};

