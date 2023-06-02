
//importing third parties liabires
const validator = require('validator');


const hashData = require('../handlers/bcrypt')
//importing modules
const {createNewUser, checkExistingData} = require('../repository/userRepository')
const joiSignupValidator = require('../handlers/joi')



// joi validating trim min value string andnot empty condtion


//function to handel the signup
const signupController = async (fullName,userName,email,password,req,res)=>{
    // trimming to remove white spaces
        const trimmedFullName = fullName.trim();
        const trimmedUserName = userName.trim();
        const trimmedEmail = email.trim();

        joiSignupValidator(fullName,userName,email,password,req)

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
        try{
        const hashedPassword = await hashData(password)
        const emailExists = await checkExistingData('email', trimmedEmail);
        const userNameExists = await checkExistingData('userName', trimmedUserName);
    
        if (!emailExists && !userNameExists) {
         const token = await createNewUser(trimmedFullName, trimmedUserName, trimmedEmail, hashedPassword);
    
          // Handle success response
          return res.status(200).json({ success: true, token: token });
        } else {
          // Handle existing user error response
          return res.status(400).json({ error: 'Username or email already in use' });
        }
      } catch (error) {
        // Handle other errors
        return res.status(500).json({ error: 'An error occurred' });
      }
}
module.exports = signupController;