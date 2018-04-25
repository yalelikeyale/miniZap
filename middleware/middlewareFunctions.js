const {Destinations, Podio} = require('../models')

function checkPodioConnection (req, res, next) {
    const company = req.params.company
    const source = 'podio'
	Destinations.findOne({company, source})
		.then(response=>{
			if(!(response && response.destination)){
		        res.status(500).json({
		        	error:`User hasn't selected a destination for ${source_name}`,
		        	reason:'ValidationError'
		        })
			}
			req.destination = response.destination
      		req.company = company
      		Podio.findOne({company})
      			.then(podioCreds=>{
      				req.podioCreds = podioCreds
      				next()
      			})
      			.catch(error=>{console.log('podio creds search failed')})
		})
		.catch(error=>{
			res.status(500).send('Internal Server Error')
		})
	}

function checkSegmentConnection (req, res, next) {
    const company = req.params.company
    const source = 'woocomm'
	Destinations.findOne({company, source})
		.then(response=>{
			if(!(response && response.destination)){
		        res.status(500).json({
		        	error:`User hasn't selected a destination for ${source_name}`,
		        	reason:'ValidationError'
		        })
			}
			req.destination = response.destination
      		req.company = company
      		next()
		})
		.catch(error=>{
			res.status(500).send('Internal Server Error')
		})
	}

//the connections router takes an object with the credentials of the source + the destination
//this middleware checks that request to determine where to send the data
function checkConnectionRequest (req, res, next) {
	if('autopilot' in req.body){
		req.destination = 'autopilot'
	} else if ('aws' in req.body){
		req.destination = 'aws'
	} else if ('segment' in req.body){
		req.destination = 'segment'
	}
	next()
	}


function corsMiddle(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
}

//when exporting a function, in what instances do you need to wrap it with brackets
module.exports = {corsMiddle, checkConnectionRequest, checkPodioConnection, checkSegmentConnection};





