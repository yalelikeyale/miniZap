const Analytics = require('analytics-node');

const segmentFactory = () => ({
	initialize({segment_write}){
		console.log('made it into initialize')
		this.segment_write = segment_write;
		return this
	},
	sendIt(order){
		console.log('sending order...')
		console.log()
		const analytics = new Analytics(this.segment_write);
		console.log(analytics)
		analytics.track(order, function(err,batch){
			if(err){
				console.log(err)
			}
			console.log('Flushed')
		});
	}
});


module.exports = {segmentFactory}