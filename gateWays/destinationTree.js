const {Pilot} = require('../models')

const destLookUp = {
	autopilot:(destObj)=>{
		console.log('made it into destLookUp autopilot function');
		const requiredFields = ['pilot_key', 'trigger', 'company'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {pilot_key, trigger, company} = destObj
		return Pilot.create({
			company,
			pilot_key,
			trigger
		})
		.then(newPilot=>{return newPilot})
		.catch(error=>{console.log(error)})
	}
}

module.exports = {destLookUp}