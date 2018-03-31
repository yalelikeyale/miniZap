const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.post('/:action', jsonParser,(req,res)=>{
	if(req.params.action === 'identify'){
		console.log(req.body);
		res.status(201).send('user identified');
	} else if (req.params.action === 'cart_item_added'){
		console.log(req.body);
		res.status(201).send('product added to cart');
	}
});

module.exports = router;





