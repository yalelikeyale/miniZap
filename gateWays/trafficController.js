
const {AutoPilotConstructor, AWSConstructor} = require('../libraries')
const {Pilot, AWS} = require('../models')

const trafficControl = {
	autopilot:(query, user)=>{
		Pilot.find(query)
		  .then(destination=>{
		  	const autopilot = new AutoPilotConstructor({"api_key":destination.pilot_key,"trigger":destination.trigger})
		  	autopilot.start()
		  	autopilot.addContactToJourney(user)
		  })
	},
	aws:{
		orderCreated:(query, order)=>{
			console.log('made it into order created traffic control')
			AWS.find(query)
			  .then(destination=>{
			  	console.log(destination)
			  })
			  .catch(err=>{console.log(err)})
		}
	}
}

module.exports = {trafficControl}