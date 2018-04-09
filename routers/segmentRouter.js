const express = require('express');
const segmentRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Analytics = require('analytics-node');
const write_key = process.env.segment_write;

const analytics = new Analytics(write_key);


segmentRouter.post('/identify', jsonParser,(req,res)=>{
	const userObj = req.body;
	const userId = userObj.user_id
	delete userObj.user_id
	console.log(userObj)
	if(userObj){
		analytics.identify({userId:userId, traits:userObj});
		res.status(201).send('Identified')
	} else {
		analytics.identify({userId:userId});
		res.status(201).send('Identified')	
	}
});

segmentRouter.post('/order-completed', jsonParser,(req,res)=>{
	const order = req.body;
	const productsList = [];
	for(i=0;i<order.line_items.length;i++){
		let currentItem = order.line_items[i]
		let lineItem = {}
		lineItem.product_id = currentItem.product_id
		lineItem.sku = currentItem.sku
		lineItem.variation = currentItem.variation_id
		lineItem.name = currentItem.name
		lineItem.price = currentItem.price
		lineItem.quantity = currentItem.quantity
		lineItem.tax= currentItem.total_tax
		lineItem.total = currentItem.total
		productsList.push(lineItem);
	}
	orderPayload = {
		event:'Order Completed',
		userId:order.customer_id,
		properties:{
			order_id: order.id,
			total:order.total,
			shipping:order.shipping_total,
			tax:order.total_tax,
			discount:order.discount_total,
			currency:order.currency,
			products:productsList,
		}
	}
	analytics.track(orderPayload);
	res.status(201).json(orderPayload);
});

module.exports = {segmentRouter};





