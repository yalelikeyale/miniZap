
const {AutoPilotConstructor} = require('../libraries')
const {Pilot} = require('../models')

const trafficControl = {
	autopilot:(query, user)=>{
		Pilot.find({query})
		  .then(destination=>{
		  	const autopilot = new AutoPilotConstructor({"api_key":destination.pilot_key,"trigger":destination.trigger})
		  	autopilot.start()
		  	autopilot.addContactToJourney(user)
		  })
	}
}

module.exports = {trafficControl}