const express = require('express');
const queryString = require('query-string');
const podioRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request-promise');
const Podio = require('podio-js').api;
const {trafficControl} = require('../gateWays')
const {checkPodioConnection} = require('../middleware')

const userObj = {};

const getContactDetails = (field)=>{
  if(field && field.type && field.type==='email'){
    userObj.Email = field.values[0].value;
  } else if (field && field.label && field.label==='Send Surname'){
    userObj.LastName = field.values[0].value;
  } else if (field && field.label && field.label==='Send Firstname'){
    userObj.FirstName = field.values[0].value;
  }
}

const transferItem = (item_id, company, destination, podioCreds)=>{
  const podio = new Podio({
      authType: 'app',
      clientId: podioCreds.bot_id,
      clientSecret: podioCreds.podio_secret
  });
  podio.authenticateWithApp(podioCreds.app_id, podioCreds.app_token, (err) => {
    if (err) throw new Error(err);
    podio.isAuthenticated().then(() => {
      console.log('made it through authentication');
      podio.request('GET', `/item/${item_id}`)
        .then(response=>{
          response.fields.map(getContactDetails)
          //send to autopilot
          trafficControl[destination]({company:company,source:'podio'},userObj)
        })
        .catch(err=>{console.log(err)});
    }).catch(err => {
      res.status(500).send('failed to authenticate podio');
    });
  });
}


podioRouter.post('/:company/companies', [jsonParser, checkPodioConnection], (req,res)=>{
  const destination = req.destination
  const company = req.company
  const podioCreds = req.podioCreds
  if(req.body.item_id){
    let item_id = req.body.item_id;
    transferItem(item_id, company, destination, podioCreds);
    res.status(201).end();
  } else {
    let {hook_id, code} = req.body
    settings = {
      headers: {'content-type' : 'application/json'},
      uri:`https://api.podio.com/hook/${hook_id}/verify/validate`,
      json:{code}
    }
    request.post(settings)
      .then(response=>{
        console.log(response);
        res.status(201).end();
      })
      .catch(err=>{
        console.log(err)
        res.status(500).end();
      })
    }
})

module.exports = {podioRouter};

