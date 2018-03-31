const express = require('express');
const queryString = require('query-string');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const Podio = require('podio-js').api;

const USERS = [
  {id: 1,
   user: process.env.username,
   password: process.env.password
  }
];

function gateKeeper(req, res, next) {
  const {user, pass} = Object.assign(
    {user: null, pass: null}, queryString.parse(req.get('x-username-and-password')));
  req.user = USERS.find(
    (usr, index) => usr.userName === user && usr.password === pass);
  next();
}

router.use(gateKeeper);

router.get('/:category', (req,res)=>{
    if (req.user === undefined) {
        return res.status(403).json({message: 'Must supply valid user credentials'});
    }
    req.status(200).send(req.query);
    // const podio = new Podio({
    //     authType: 'server',
    //     clientId: process.env.podio_id,
    //     clientSecret: process.env.podio_secret
    // });

    // // get the app ID and Token for appAuthentication
    // const companyId = process.env.podio_company_id;
    // const companyToken = process.env.podio_company_token;

    // // instantiate the SDK
    // const podio = new Podio({
    //     authType: 'app',
    //     clientId: clientId,
    //     clientSecret: clientSecret
    // });

    // podio.authenticateWithApp(companyId, companyToken, (err) => {
    //   if (err) throw new Error(err);
    //   podio.isAuthenticated().then(() => {
    //     // Ready to make API calls in here...
    //         podio.request('GET', '/tasks').then(function(responseData) {
    //               // response, if available

    //         }).catch(function(err){
    //           console.log(err);
    //         })
    //   }).catch(err => console.log(err));
    // });
});

module.exports = router;