
//importing third parties liabires
const validator = require('validator');
const Joi = require('joi')
const jwt = require('jsonwebtoken')

//importing modules
const User = require('../models/schema/user');
const hashData =  require('../handlers/bcrypt')

//constnts that need to be hidden pachi tira
const secretKey = "nothingcomparestoyou"

// joi validating trim min value string andnot empty condtion
const signupSchema = Joi.object({
    fullName: Joi.string().trim().min(3).required(),
    userName: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
})


//function to handel the signup
const signupController = async (fullName,userName,email,password,req,res)=>{
    // trimming to remove white spaces
        const trimmedFullName = fullName.trim();
        const trimmedUserName = userName.trim();
        const trimmedEmail = email.trim();

        //calling the joi validation 
        await signupSchema.validateAsync(req.body)

    // Assuming fullName should only contain alphabetic characters
        const fullNameRegex = /^[A-Za-z]+$/;
        if (!fullNameRegex.test(trimmedFullName)) {
            return res.status(400).json({ error: 'Full name must only contain alphabetic characters' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

  // Assuming password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
        }

    //checking if username and email already exist in the database
        const existingEmail = await User.findOne({email: trimmedEmail})
        const existingUserName = await User.findOne({email: trimmedUserName})
        if(!existingEmail && !existingUserName){
            const hashedPassword = await hashData(password)
            
            const newUser = new User({
            fullName: trimmedFullName,
            userName: trimmedUserName,
            email: trimmedEmail,
            password: hashedPassword,
        });

        try {
            // Save the new user to the database
            const savedUser = await newUser.save();


            //generating the jwt token
            const token = jwt.sign({ userId: savedUser._id, email: savedUser.email, userName: savedUser.userName}, secretKey);
            savedUser.tokens.push({token})
            await savedUser.save()
            // Handle the success case
            return res.status(200).json({ success: true, user: savedUser, token });
        } catch (error) {
            // Handle the error case
            return res.status(500).json({ error: 'An error occurred while saving the user to the database' });
        }

        }else{
            return res.status(400).json({
                error: 'Username or email already in use'
            })
        }

}
module.exports = signupController;