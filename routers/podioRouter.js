const express = require('express');
const queryString = require('query-string');
const podioRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const rp = require('request-promise');
const Podio = require('podio-js').api;


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
  console.log(req.body.hook_id);
  let hook_id = req.body.hook_id;
  const options = {
    method:'POST',
    uri:`https://api.podio.com/hook/${hook_id}/verify/validate`
  }
  rp(options)
    .then(res=>{
      console.log('hook verified')
    })
    .catch(err => {
      console.log(err);
    })
    res.status(201).end();
})

module.exports = {podioRouter};
