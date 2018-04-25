
const {AutoPilotConstructor, AWSConstructor} = require('../libraries')
const {Pilot, AWS} = require('../models')

const trafficControl = {
	autopilot:(query, user)=>{
		//fiddled with this need to correct
		Pilot.findOne(query)
		  .then(destination=>{
		  	const autopilot = new AutoPilotConstructor({"api_key":destination.pilot_key,"trigger":destination.trigger})
		  	autopilot.start()
		  	autopilot.addContactToJourney(user)
		  })
	},
	aws:{
		orderCreated:(query, order)=>{
			const company = query
			AWS.findOne({company})
			  .then(destination=>{
			  	if(destination){
			  		const {access_key, secret_key, region, bucket} = destination
				  	const awsControl = new AWSConstructor({
				  		"access_key":access_key,
				  		"secret_key":secret_key,
				  		"region":region
				  	})
				  	const order_id = order.properties.order_id
				  	const products = order.properties.products
				  	delete order.properties['products']
				 	awsControl.start()
					awsControl.uploadOrder(order, query, bucket)
			    }
			  })
			  .catch(err=>{console.log(err)})
		}
	}
}

module.exports = {trafficControl}