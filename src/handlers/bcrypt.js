const bcrypt = require('bcrypt')


const hashData = async (data)=>{
    const saltRounds = 8;
    try{
        const hashedText = await bcrypt.hash(data, saltRounds);
        return hashedText

    }catch(e){
        throw new Error('Error hashing password')

    }
}


module.exports = hashData