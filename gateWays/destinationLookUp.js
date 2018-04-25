const {Pilot, AWS} = require('../models')

const destLookUp = {
	autopilot:(destObj)=>{
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
	},
	aws:(destObj)=>{
		const requiredFields = ['access_key', 'secret_key', 'company'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {access_key, secret_key, company} = destObj
		console.log(access_key, secret_key, company)
		return AWS.create({
			company,
			access_key,
			secret_key
		})
		.then(newAWS=>{console.log(newAWS);return newAWS})
		.catch(error=>{console.log(error)})
	}
}

module.exports = {destLookUp}