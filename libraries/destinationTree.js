const {Pilot} = require('../models')

const destLookUp = {
	autopilot:function(destObj){
		console.log('made it into destLookUp autopilot function');
		const requiredFields = ['source', 'pilot_key', 'trigger'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {source, pilot_key, trigger} = destObj
		return Pilot.create({
			source,
			pilot_key,
			trigger
		})
		.then(newPilot=>{return newPilot})
		.catch(error=>{console.log(error)})
	}
}

module.exports = {destLookUp}