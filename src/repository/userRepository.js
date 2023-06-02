const User = require('../models/schema/user');
const jwt = require('jsonwebtoken')


//constnts that need to be hidden pachi tira
const secretKey = "nothingcomparestoyou"


//creating new user 
const createNewUser = async (fullName, userName, email,hashedPassword)=>{
    
        const newUser = new User({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
    
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id, email: savedUser.email, userName: savedUser.userName}, secretKey);
        savedUser.tokens.push({token})    
        return token

}





//checking if the user already exist in the database
const checkExistingData = async (attribute, data) => {
    const query = {};
    query[attribute] = data;
    const existingData = await User.findOne(query);
    console.log(`the data is already in use`)
    if (existingData) {
      return true;
    } else {
      return false;
    }
  };
  


module.exports = {
    createNewUser: createNewUser,
    checkExistingData: checkExistingData
}