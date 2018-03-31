const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// const {WooModel} = require('./models/wooModels');

router.post('/:action', jsonParser,(req,res)=>{
	if(req.params.action === 'identify'){
		console.log(req.body);
		res.status(201).send('user identified');
	}
});

module.exports = router;





