const express = require('express');
const segmentRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//need to move this over to traffic control
// const Analytics = require('analytics-node');
// const analytics = new Analytics(write_key);
const {checkSegmentConnection} = require('../middleware')
const {trafficControl} = require('../gateWays')



segmentRouter.post('/:company/identify', jsonParser,(req,res)=>{
	const userObj = req.body;
	const userId = userObj.user_id
	delete userObj.user_id
	if(userObj){
		// analytics.identify({userId:userId, traits:userObj});
		// send to aws or segment
		res.status(201).send('Identified')
	} else {
		//send to aws or segment
		res.status(201).send('Identified')	
	}
});

segmentRouter.post('/:company/order-completed', [jsonParser, checkSegmentConnection], (req,res)=>{
	const destination = req.destination
	const company = req.company
	const order = req.body;
	const productsList = [];
	if(('coupon_lines' in order)&&(order.coupon_lines.length>0)){
		if('coupon_code' in order.coupon_lines[0]){
			const coupon_code = order.coupon_lines[0].coupon_code
		}
	}
	if ('line_items' in order){
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
			lineItem.subtotal = currentItem.subtotal
			lineItem.total = currentItem.total
			productsList.push(lineItem);
		}
		orderPayload = {
			event:'Order Completed - WC',
			userId:order.customer_id,
			properties:{
				order_id: order.id,
				order_key:order.order_key,
				status:order.status,
				total:order.total,
				shipping:order.shipping_total,
				tax:order.total_tax,
				discount:order.discount_total,
				coupon:order.coupon_code,
				currency:order.currency,
				products:productsList
			}
		}
		//send to aws or segment
		trafficControl[destination].create(company, orderPayload)
	}
});

segmentRouter.post('/:company/order-updated', jsonParser, (req,res)=>{
	const order = req.body;
	const productsList = [];
	if(('coupon_lines' in order)&&(order.coupon_lines.length>0)){
		if('coupon_code' in order.coupon_lines[0]){
			const coupon_code = order.coupon_lines[0].coupon_code
		}
	}
	if ('line_items' in order){
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
			lineItem.subtotal = currentItem.subtotal
			lineItem.total = currentItem.total
			productsList.push(lineItem);
		}
		orderPayload = {
			event:'Order Updated - WC',
			userId:order.customer_id,
			properties:{
				order_id: order.id,
				order_key:order.order_key,
				status:order.status,
				total:order.total,
				shipping:order.shipping_total,
				tax:order.total_tax,
				discount:order.discount_total,
				coupon:order.coupon_code,
				currency:order.currency,
				products:productsList
			}
		}
		//send to aws or segment
		res.status(201).end();
	}
	res.status(400).end();
})

module.exports = {segmentRouter};


