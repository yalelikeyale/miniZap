const AWS = require('aws-sdk');

const AWSConstructor = function Constructor(user_settings) {
	this.access_key = user_settings.access_key;
	this.secret_key = user_settings.secret_key;
  this.region = user_settings.region;
};

// const AutoPilot = new AutoPilotConstructor()

AWSConstructor.prototype.start = ()=>{
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = AWSConstructor.access_key;
  AWS.config.secretAccessKey = AWSConstructor.secret_key;
  AWS.config.region = AWSConstructor.region;
  s3 = new AWS.S3();
}

AWSConstructor.prototype.uploadOrder = (order, company, bucket)=>{
  const order_id = order.properties.order_id
  const params = {
      Body: JSON.stringify(order),
      Bucket: bucket,
      Key: `${company}_${order_id}.json`,
  };
  s3.upload(params, (err, data) => {
      if(err)
          console.log(err);
      else
          console.log("success");
  });
}

module.exports = {AWSConstructor}