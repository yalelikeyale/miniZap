const AWS = require('aws-sdk');

const dynamoFactory = () => ({
	initialize({access_key, secret_key, region, endpoint}){
		this.access_key = access_key;
		this.secret_key = secret_key;
		this.region = region;
		this.endpoint = endpoint;
		return this
	},
	setConfig(){
		AWS.config = new AWS.Config();
	    AWS.config.accessKeyId = this.access_key;
	    AWS.config.secretAccessKey = this.secret_key;
	    AWS.config.region = this.region;
	    AWS.config.endpoint = this.endpoint;
	},
	sendIt(order, table){
	    const params = {
	        TableName:table,
	        Item:order
	    };
	    const docClient = new AWS.DynamoDB.DocumentClient();
	    docClient.put(params, function(err, data) {
	        if (err) {
	            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	        } else {
	            console.log("Added item:", JSON.stringify(data, null, 2));
	        }
	    })
	}
});


module.exports = {dynamoFactory}