//write code that will add data to the request object with information about what destination to send the data to
//based on that information, the endpoint will know which destination object to use 
const {Destinations} = require('../models')

function checkConnections (req, res, next) {
	const user_name = req.headers.user;
	const source_name = req.headers.source;
	Destinations.findOne({user_name, source_name})
		.then(response=>{
			if(!(response && response.destination)){
				if(!(count===1)){
				  //don't fully understand this. would rather tell the client they made an invalid request here
		          // return Promise.reject({
		          //   code: 422,
		          //   reason: 'ValidationError',
		          //   message: "User hasn't selected a destination for " + source_name,
		          //   location: 'source_name'
		          // });			
		          res.status(422).send("User hasn't selected a destination for " + source_name).end()	
				}
			}
			req.destination = response.destination;
			next();
		})
		.catch(error=>{
			res.status(422).send("User hasn't selected a destination for " + source_name)
		})
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
module.exports = {checkConnections, corsMiddle};