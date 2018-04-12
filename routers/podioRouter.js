const express = require('express');
const queryString = require('query-string');
const podioRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const rp = require('request-promise');
const Podio = require('podio-js').api;

const _podioId = process.env.podio_id;
const _podioSecret = process.env.podio_secret;
const companyId = process.env.podio_company_id;
const companyToken = process.env.podio_company_token;

let Autopilot = require('autopilot-api');
let autopilot = new Autopilot(process.env.autopilot);

const userObj = {};

// instantiate the SDK
const podio = new Podio({
    authType: 'app',
    clientId: _podioId,
    clientSecret: _podioSecret
});

const getContactDetails = (field)=>{
  if(field && field.type && field.type==='email'){
    console.log(field.values[0].value);
    userObj.Email = field.values[0].value;
  } else if (field && field.label && field.label==='Send Surname'){
    console.log(field.values[0].value);
    userObj.LastName = field.values[0].value;
  } else if (field && field.label && field.label==='Send Firstname'){
    console.log(field.values[0].value);
    userObj.FirstName = field.values[0].value;
  }
}

const getItemDetails = (item_id)=>{
  console.log('made it into get item details')
  podio.authenticateWithApp(companyId, companyToken, (err) => {
    if (err) throw new Error(err);
    podio.isAuthenticated().then(() => {
      console.log('made it through authentication');
      // res.status(200).send('made it through authentication')
      podio.request('GET', `/item/${item_id}`)
        .then(response=>{
          response.fields.map(getContactDetails)
          autopilot.contacts.upsert(userObj)
          .then(result=>{
            autopilot.journeys.add('0001', userObj.Email, (err,resp)=>{
              if(err){
                console.error(err);
              }
              console.log(`added ${userObj.FirstName} to journey starting with trigger 0001`);
            })

          })
          .catch(err=>{console.error(err)})
        });
    }).catch(err => {
      res.status(500).send('something went wrong');
    });
  });
}


podioRouter.post('/companies', jsonParser, (req,res)=>{
  let item_id = req.body.item_id;
  getItemDetails(item_id);
  res.status(201).end();
})

module.exports = {podioRouter};

