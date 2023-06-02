
//importing liabires
const validator = require('validator');
const User = require('../models/schema/user');
const bcrypt = require('bcrypt')



const signupController = async (fullName,userName,email,password,req,res)=>{
     const trimmedFullName = fullName.trim();
     const trimmedUserName = userName.trim();
    const trimmedEmail = email.trim();
    if (trimmedFullName.length === 0) {
    return res.status(400).json({ error: 'Full name is required' });
  }

  // Assuming minimum length requirement of 3 characters for fullName
  if (trimmedFullName.length < 3 || trimmedUserName < 3) {
    return res.status(400).json({ error: 'Full name and username must be at least 3 characters long' });
  }

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
    const newUser = new User({
    fullName: trimmedFullName,
    userName: trimmedUserName,
    email: trimmedEmail,
    password: password,
  });
    try {
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Handle the success case
    return res.status(200).json({ success: true, user: savedUser });
  } catch (error) {
    // Handle the error case
    return res.status(500).json({ error: 'An error occurred while saving the user to the database' });
  }


}
module.exports = signupController;