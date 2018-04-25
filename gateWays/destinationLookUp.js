const {Pilot, AWS, Segment} = require('../models')

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
		const requiredFields = ['access_key', 'secret_key', 'region','bucket','company','db_name','host','user','password','port'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {access_key, secret_key, region, bucket, company, db_name, host, user, password, port} = destObj
		return AWS.create({
			company,
			access_key,
			secret_key,
			region,
			bucket,
			host,
			db_name,
			user,
			password,
			port
		})
		.then(newAWS=>{console.log(newAWS);return newAWS})
		.catch(error=>{console.log(error)})
	},
	segment:(destObj)=>{
		const requiredFields = ['segment_write', 'company'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {segment_write, company} = destObj
		return Segment.create({
			company,
			segment_write
		})
		.then(newSeg=>{console.log(newSeg);return newSeg})
		.catch(error=>{console.log(error)})
	}
}

module.exports = {destLookUp}