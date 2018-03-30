const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// const {WooModel} = require('./models/wooModels');

router.post('/:action', jsonParser,(req,res)=>{
  console.log(req.params.action);
  if(req.params.action==='added'){
    console.log(req.body);
  } else if (req.params.action==='removed'){
  	console.log(req.body);
  }
});

module.exports = router;





