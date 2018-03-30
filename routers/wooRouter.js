const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// const {WooModel} = require('./models/wooModels');

router.post('/', jsonParser,(req,res)=>{
  let newOrder = req.body;
  res.status(201).json(newOrder);
});

module.exports = router;





