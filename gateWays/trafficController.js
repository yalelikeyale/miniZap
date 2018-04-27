
const {AutoPilotConstructor, dynamoFactory} = require('../libraries')
const {Pilot, AWS} = require('../models')

const trafficControl = {
	autopilot:{
		create:(query, user)=>{
		Pilot.findOne(query)
		  .then(destination=>{
		  	const autopilot = new AutoPilotConstructor({
		  							"api_key":destination.pilot_key,
		  							"trigger":destination.trigger
		  						})
		  	autopilot.start()
		  	autopilot.addContactToJourney(user)
		  })
		}
	},
	aws:{
		create:(query, order)=>{
			const company = query
			AWS.findOne({company})
			  .then(destination=>{
			  	if(destination){
				  	const order_id = order.properties.order_id
				  	const products = order.properties.products
				  	const userId = order.userId
				  	const event = order.event
				  	delete order.properties.products
				  	let order_details = order.properties
				  	order_details = Object.assign({user_id:userId, event:event}, order_details)
			  		const {access_key, secret_key, region, endpoint} = destination
				  	const awsControl = dynamoFactory()
				  	awsControl.initialize({"access_key":access_key, "secret_key":secret_key, "region":region, "endpoint":endpoint})
				  	awsControl.setConfig()
				  	awsControl.sendIt(order, 'orders')
			    }
			  })
			  .catch(err=>{console.log(err); res.status(500).send('Internal Server Error')})
		}
	}
}

module.exports = {trafficControl}