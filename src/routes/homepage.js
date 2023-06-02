const express = require('express')

const router = express.Router()


router.get('/',async (req,res)=>{
      const data = {
    title: 'Handlebars Integration',
    heading: 'Welcome to Handlebars!',
    content: 'This is an example integration with Express and Handlebars.'
  };

  res.render('index', data);
})
    
module.exports = router