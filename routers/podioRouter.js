const express = require('express');
const queryString = require('query-string');
const podioRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const rp = require('request-promise');
const Podio = require('podio-js').api;
const {trafficControl} = require('../gateWays')

const _podioId = process.env.podio_id;
const _podioSecret = process.env.podio_secret;
const companyId = process.env.podio_company_id;
const companyToken = process.env.podio_company_token;

const userObj = {};

// instantiate the SDK
const podio = new Podio({
    authType: 'app',
    clientId: _podioId,
    clientSecret: _podioSecret
});

const getContactDetails = (field)=>{
  if(field && field.type && field.type==='email'){
    userObj.Email = field.values[0].value;
  } else if (field && field.label && field.label==='Send Surname'){
    userObj.LastName = field.values[0].value;
  } else if (field && field.label && field.label==='Send Firstname'){
    userObj.FirstName = field.values[0].value;
  }
}

const getItemDetails = (item_id)=>{
  podio.authenticateWithApp(companyId, companyToken, (err) => {
    if (err) throw new Error(err);
    podio.isAuthenticated().then(() => {
      console.log('made it through authentication');
      // res.status(200).send('made it through authentication')
      podio.request('GET', `/item/${item_id}`)
        .then(response=>{
          response.fields.map(getContactDetails)
          //send to autopilot
          trafficControl.autopilot({company:'digivest',source:'podio'},userObj)
        })
        .catch(err=>{console.log(err)});
    }).catch(err => {
      res.status(500).send('failed to authenticate podio');
    });
  });
}


podioRouter.post('/companies', jsonParser, (req,res)=>{
  let item_id = req.body.item_id;
  console.log(req.body)
  console.log(req.header)
  // getItemDetails(item_id);
  res.status(201).end();
})

podioRouter.post('/hook_test', jsonParser, (req,res)=>{
  console.log(req.body)
  console.log(req.header)
  // getItemDetails(item_id);
  res.status(201).end();
})

module.exports = {podioRouter};

