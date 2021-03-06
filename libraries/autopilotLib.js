let Autopilot = require('autopilot-api');

const AutoPilotConstructor = function Constructor(user_settings) {
	this.trigger = user_settings.trigger
	this.api_key = user_settings.api_key
};

AutoPilotConstructor.prototype.start = ()=>{
	const autopilot = new Autopilot(AutoPilotConstructor.api_key)
}

AutoPilotConstructor.prototype.addContactToJourney = (user)=>{
    autopilot.contacts.upsert(user)
      .then(result=>{
        autopilot.journeys.add('0001', user.Email, (err,resp)=>{
          if(err){
            console.error(err);
          }
          console.log(`added ${userObj.FirstName} to journey starting with trigger ${AutoPilot.trigger}`);
        })

      })
      .catch(err=>{console.error(err)})
}



module.exports = {AutoPilotConstructor}

