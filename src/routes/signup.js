//importing third party liabiries
const express = require('express')


// importing modules
const signupController = require('../controllers/signupController')



// initiating middlewares
router = express.Router()


//signup new user route
router.post('/myapp/signup', async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    await signupController(fullName,userName,email,password,req,res)

  });
  

// exporting the router
module.exports = router