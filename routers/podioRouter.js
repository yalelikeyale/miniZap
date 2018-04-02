const express = require('express');
const queryString = require('query-string');
const podioRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const Podio = require('podio-js').api;

const USERS = [
  {user: process.env.username,
   password: process.env.password
  }
];

podioRouter.get('/:category', (req,res)=>{

    // get the app ID and Token for appAuthentication
    const companyId = process.env.podio_company_id;
    const companyToken = process.env.podio_company_token;

    // instantiate the SDK
    const podio = new Podio({
        authType: 'app',
        clientId: process.env.podio_id,
        clientSecret: process.env.podio_secret
    });

    podio.authenticateWithApp(companyId, companyToken, (err) => {
      if (err) throw new Error(err);
      podio.isAuthenticated().then(() => {
        console.log('made it through authentication');
        res.status(200).send('made it through authentication')
        // Ready to make API calls in here...
            // podio.request('GET', '').then(function(responseData) {
            //       // response, if available

            // }).catch(function(err){
            //   console.log(err);
            // })
      }).catch(err => {
        res.status(500).send('something went wrong');
      });
    });
});

podioRouter.post('/companies', (req,res)=>{
  console.log(req);
})

module.exports = {podioRouter};
