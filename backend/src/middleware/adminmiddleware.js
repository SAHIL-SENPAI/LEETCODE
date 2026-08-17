const jwt = require("jsonwebtoken")
const User = require("../models/user");
const client = require("../config/redis")


const adminmiddleware = async(req , res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
            throw new Error("token does not exists");

        const payload = jwt.verify(token,process.env.JWT_KEY);

        const {_id} = payload;
        if(!_id)
            throw new Error("id missing");

        const result = await User.findById(_id);

        if(payload.role!="admin")
            throw new Error("invalid token");

        if(!result)
            throw new Error("user dosent exists");

        //check if token is blocked in redis 
        const isblocked = await client.exists(`token:${token}`);
        if(isblocked)
            throw new Error("token blocked");

        req.result = result;

        next()
    }
    catch(err){
        res.send("middleware error" + err)
    }
}

module.exports = adminmiddleware;