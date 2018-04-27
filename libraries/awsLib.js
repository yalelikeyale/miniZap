const AWS = require('aws-sdk');

const AWSConstructor = function Constructor(user_settings) {
	this.access_key = user_settings.access_key;
	this.secret_key = user_settings.secret_key;
  this.region = user_settings.region;
  this.endpoint = user_settings.endpoint;
};

AWSConstructor.prototype.start = ()=>{
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = AWSConstructor.access_key;
  AWS.config.secretAccessKey = AWSConstructor.secret_key;
  AWS.config.region = AWSConstructor.region;
  AWS.config.endpoint = AWSConstructor.endpoint;
}

AWSConstructor.prototype.uploadOrder = (order, table)=>{
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

module.exports = {AWSConstructor}