const Joi = require('joi')

const joiSignupValidator =async (fullName,userName,email,password,req)=>{


    const signupSchema = Joi.object({
        fullName: Joi.string().trim().min(3).required(),
        userName: Joi.string().trim().min(3).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).required(),

    })
            //calling the joi validation 
        await signupSchema.validateAsync(req.body)
}

module.exports = joiSignupValidator