// let autopilot = require('autopilot-api');

// const AutoPilotConstructor = function Constructor(user_settings) {
// 	this.api_key = user_settings.api_key
// };

// const AutoPilot = new AutoPilotConstructor({"api_key":process.env.autopilot_key})
// const autopilot = new autopilot(AutoPilot.api_key);

// AutoPilot.prototype.addContactToJourney = function(user){
//     autopilot.contacts.upsert(user)
//       .then(result=>{
//         autopilot.journeys.add('0001', userObj.Email, (err,resp)=>{
//           if(err){
//             console.error(err);
//           }
//           console.log(`added ${userObj.FirstName} to journey starting with trigger 0001`);
//         })

//       })
//       .catch(err=>{console.error(err)})
// }

// module.exports = {AutoPilot}