const express = require('express')
const validator = require('validator')
const signupController = require('../controllers/signupController')
//
router = express.Router()
router.post('/myapp/signup', async (req, res) => {
    const { fullName, userName, email, password } = req.body;
   signupController(fullName,userName,email,password,req,res)

  });
  

// exporting the router
module.exports = router