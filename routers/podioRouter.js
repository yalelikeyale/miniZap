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

// instantiate the SDK
const podio = new Podio({
    authType: 'app',
    clientId: _podioId,
    clientSecret: _podioSecret
});

podioRouter.use(require('podio-js').middleware({
  clientId: _podioId,
  clientSecret: _podioSecret
}));


podioRouter.get('/', (req,res)=>{
    // get the app ID and Token for appAuthentication
    podio.authenticateWithApp(companyId, companyToken, (err) => {
      if (err) throw new Error(err);
      podio.isAuthenticated().then(() => {
        console.log('made it through authentication');
        // res.status(200).send('made it through authentication')
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

podioRouter.post('/companies', jsonParser, (req,res)=>{
  let hook_id = res.body.hook_id;
  podio.authenticateWithApp(companyId, companyToken, (err) => {
    if (err) throw new Error(err);
    podio.isAuthenticated().then(() => {
      console.log('made it through authentication');
      // res.status(200).send('made it through authentication')
      podio.request('GET', `/app/${companyId}/field/${hook_id}`)
        .then(response=>{console.log(response); res.status(200).end()});
    }).catch(err => {
      res.status(500).send('something went wrong');
    });
  });
})

module.exports = {podioRouter};




