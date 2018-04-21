
function checkConnections (req, res, next) {
	const user_name = req.headers.user;
	const source_name = req.headers.source;
	Destinations.findOne({company, source_name})
		.then(response=>{
			if(!(response && response.destination)){
				if(!(count===1)){		
		          res.status(500).json({
		          	error:`User hasn't selected a destination for ${source_name}`,
		          	reason:'ValidationError'
		          })
				}
			}
			req.destination = response;
			next();
		})
		.catch(error=>{
			res.status(422).send("User hasn't selected a destination for " + source_name)
		})
}

//the connections router takes an object with the credentials of the source + the destination
//this middleware checks that request to determine where to send the data
function checkConnectionRequest (req, res, next) {
	if('autopilot' in req.body){
		req.destination = 'autopilot'
		}
	next()
	}

//requests to the podio endpoint will have the company in the req params, so this function will look up
//what destination is associated with podio for that company
function checkPodioRequest (req, res, next) {
	const company = req.params.company;
	
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
module.exports = {corsMiddle, checkConnectionRequest};





