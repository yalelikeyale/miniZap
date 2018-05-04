const dateTime = require('node-datetime');
const {AutoPilotConstructor, dynamoFactory, segmentFactory} = require('../libraries')
const {Pilot, AWS, Segment} = require('../models')

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
			  		const dt = dateTime.create();
					const timeNow = dt.format('Y-m-d H:M:S');
				  	const order_id = order.properties.order_id
				  	const products = order.properties.products
				  	const userId = order.userId
				  	const event = order.event
				  	delete order.properties.products
				  	let order_details = order.properties
				  	order_details = Object.assign({user_id:userId, event:event, timestamp:timeNow}, order_details)
			  		const {access_key, secret_key, region, endpoint} = destination
				  	const awsControl = dynamoFactory()
				  	awsControl.initialize({"access_key":access_key, "secret_key":secret_key, "region":region, "endpoint":endpoint})
				  	awsControl.sendOrder(order_details)
				  	awsControl.sendItems(products)
			    }
			  })
			  .catch(err=>{console.log(err); res.status(500).send('Internal Server Error')})
		}
	},
	segment:{
		create:(query, order) => {
			const company = query
			Segment.findOne({company})
				.then(destination => {
					if(destination){
						const {segment_write} = destination
						const segmentControl = segmentFactory()
					  	segmentControl.initialize({segment_write})
					  	segmentControl.sendIt(order)
					}
				})
			}
		}
	}

module.exports = {trafficControl}