// importing frameworks and liabirires
const express = require('express')
const path = require('path')
require('./models/dbconnection')


//importing soruce files
const signUpRoute = require('./routes/signup')

//GLOBAL constants
const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'./public')

//instances
const app = express()





//mounting middlewares on our express application
app.use(express.json())
app.use(signUpRoute)
app.use(express.static(publicDirectoryPath))

//view engine

// listening to port 
app.listen(PORT,()=>{
	console.log('listening to port no',PORT)
})
