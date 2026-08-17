
const validator = require("validator")


const validate = (data)=>{
    
    //api level validation
    const mandatoryField = ['firstName','emailId','password'];
    const isAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error("feilds missing");
    if(!validator.isEmail(data.emailId))
        throw new Error("invalid email");
    if(!validator.isStrongPassword(data.password))
        throw new Error("weak password");

}

module.exports = validate;