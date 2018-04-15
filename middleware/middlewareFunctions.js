//write code that will add data to the request object with information about what destination to send the data to
//based on that information, the endpoint will know which destination object to use 
// const {Podio, Pilot} = require('../models')

// function checkConnections (req, res, next) {
// 	const user_name = req.headers.user;
// 	const source_name = req.headers.source;
// 	Destinations.findOne({user_name, source_name})
// 		.then(response=>{
// 			if(!(response && response.destination)){
// 				if(!(count===1)){		
// 		          res.status(500).json({
// 		          	error:`User hasn't selected a destination for ${source_name}`,
// 		          	reason:'ValidationError'
// 		          })
// 				}
// 			}
// 			req.destination = response;
// 			next();
// 		})
// 		.catch(error=>{
// 			res.status(422).send("User hasn't selected a destination for " + source_name)
// 		})
// }

function checkDestination (req, res, next) {
	if('autopilot' in req.body){
		req.destination = 'autopilot'
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
module.exports = {corsMiddle, checkDestination};