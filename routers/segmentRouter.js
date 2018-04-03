const express = require('express');
const segRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
	url: 'http://example.com',
	consumerKey: 'ck_8ed852babf969a3edf04625213bb73e0d677e352',
	consumerSecret: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
	wpAPI: true,
	version: 'wc/v1'
});


segRouter.post('/identify', jsonParser,(req,res)=>{

});

segRouter.post('/addtocart', jsonParser,(req,res)=>{

});

module.exports = {segRouter};





