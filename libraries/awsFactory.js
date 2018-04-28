const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const dateTime = require('node-datetime');

const genOrderItem = (product)=>{
	const dt = dateTime.create();
	const formatted = dt.format('Y-m-d H:M:S');
	const orderItem = Object.assign({item_id:uuidv1(),timestamp:formatted}, product)
    const item = {
                PutRequest: {
                 Item: orderItem
                }
             };
    return item
}

const dynamoFactory = () => ({
	initialize({access_key, secret_key, region, endpoint}){
		this.access_key = access_key;
		this.secret_key = secret_key;
		this.region = region;
		this.endpoint = endpoint;
		return this
	},
	sendOrder(order){
		AWS.config = new AWS.Config();
	    AWS.config.accessKeyId = this.access_key;
	    AWS.config.secretAccessKey = this.secret_key;
	    AWS.config.region = this.region;
	    AWS.config.endpoint = this.endpoint;
	    const params = {
	        TableName:'orders',
	        Item:order,
	        ReturnValues: 'ALL_OLD'
	    };
	    const docClient = new AWS.DynamoDB.DocumentClient();
	    console.log('Sending item to DynamoDB')
	    docClient.put(params, function(err, data) {
	        if (err) {
	            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	        } else {
	            console.log("Added item:", JSON.stringify(data, null, 2));
	        }
	    })
	},
	sendItems(products){
		AWS.config = new AWS.Config();
	    AWS.config.accessKeyId = this.access_key;
	    AWS.config.secretAccessKey = this.secret_key;
	    AWS.config.region = this.region;
	    AWS.config.endpoint = this.endpoint;
	    const orderItems = products.map(genOrderItem)
	    const params = {
	    	RequestItems:{
	    		'order_items':orderItems
	    	}
	    }
	    const docClient = new AWS.DynamoDB.DocumentClient();
	    docClient.batchWrite(params, function(err, data) {
	        if (err) {
	            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	        } else {
	            console.log('Added ' + orderItems.length + ' items to DynamoDB');
	        }
	    })
	}
});


module.exports = {dynamoFactory}


