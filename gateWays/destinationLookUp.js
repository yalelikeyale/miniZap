const {Pilot, AWS, Segment} = require('../models')

const destLookUp = {
	aws:(destObj)=>{
		const requiredFields = ['access_key', 'secret_key', 'region','endpoint','company'];
    	const missingField = requiredFields.find(field => !(field in destObj));
        if (missingField) {
    		res.status(422).json({
        	reason: 'ValidationError',
        	message: 'Missing field',
        	location: missingField
    	    });
  		}
		const {access_key, secret_key, region, endpoint, company} = destObj
		return AWS.findOne({secret_key, access_key})
			.then(exists=>{
				if(exists){
					Promise.reject({reason:'duplicate'})
				} else {
					return null
				}
			})
			.then(()=>{
				return AWS.create({
					company,
					access_key,
					secret_key,
					region,
					endpoint
				})
				.then(newAWS=>{return newAWS})
				.catch(error=>{Promise.reject(error)})
			})
			.then(newAWS=>{
				return newAWS
			})
			.catch(err=>{
				if (err.reason === 'ValidationError') {
					return Promise.reject(err)
				}
				return Promise.reject(err)
			})
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
		return Segment.findOne({segment_write})
			.then(exists=>{
				console.log('exists: ' + exists)
				if(exists){
					console.log('Segment Write Key Exists')
			        return Promise.reject({
			           code: 422,
			           reason: 'ValidationError',
			           message: 'Duplicate Segment Instane. This Segment is associated with another Client'
			         });				
				}
				return null
			})
			.then(()=>{
				console.log('Made it into the segment then statement to fire segment create')
				return Segment.create({
					company,
					segment_write
				})
				.then(newSeg=>{return newSeg})
				.catch(error=>{Promise.reject(error)})
			})
			.then(newSeg=>{
				console.log('New Segment: ' + newSeg)
				return newSeg
			})
			.catch(err=>{
				console.log('In error statement: '+err.reason)
				if (err.reason === 'ValidationError') {
					console.log('Error Code: '+err.code)
					return Promise.reject(err)
				}
				return Promise.reject(err)
			})
		}
	}

module.exports = {destLookUp}

