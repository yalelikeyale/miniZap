const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.get('/', (req,res)=>{
	Blog_Posts
    .find()
    .then(posts => {
      res.status(200).json({
        blogPosts: posts.map(
          (post) => post.serialize())
      });
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});