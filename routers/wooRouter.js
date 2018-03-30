const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// const {WooModel} = require('./models/wooModels');

router.post('/:action', jsonParser,(req,res)=>{
  console.log(req.params.action);
  if(req.params.action==='add_to_cart'){
    console.log(req.body);
  }
});

module.exports = router;





