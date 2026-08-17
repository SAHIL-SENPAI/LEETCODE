const client = require("../config/redis");
const User = require("../models/user")
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Submission = require("../models/submission")

const register = async (req,res)=>{
    //firstname emailid and password is mandatory feilds;
    try{
        validate(req.body);

        const {emailId,password} = req.body;
        
        req.body.password = await bcrypt.hash(password,10);
        req.body.role = "user";
        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,emailId:emailId,role:"user"},process.env.JWT_KEY, {expiresIn:"30m"});
        const reply = {
            username:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }
        res.cookie("token",token,{maxAge:30*60*1000});

        res.status(200).json({
            user:reply,
            message:"Register Successfully"
        });
    }
    catch(err){
        res.status(400).send("error occured : " + err)
    }
}

const login = async(req,res)=>{
    try{

        const {emailId,password} = req.body;

        if(!emailId || !password)
            throw new Error("invalid credentials");

        const user = await User.findOne({emailId})
        if(!user)
            throw new Error("invalid credentials")

        const match = await bcrypt.compare(password,user.password);
        if(!match)
            throw new Error("invalid credentials");
        
        const reply = {
            firstname: user.firstName,
            emailId:user.emailId,
            _id:user._id
        }
        const token = jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:"30m"});
        res.cookie("token",token,{maxAge:30*60*1000});

        res.status(200).json({
            user:reply,
            message:"Login Successfully"
        });

    }
    catch(err){
        res.status(400).send("error occured :"+err)
    }
}

const logout = async(req,res)=>{
    try{

       const {token} = req.cookies;

       const payload = jwt.decode(token);

       await client.set(`token:${token}`,"blocked")
       await client.expireAt(`token:${token}`,payload.exp);

       res.cookie('token',null,{expires : new Date(Date.now())});
       res.send("logout sucessfull");

    }
    catch(err){
        res.status(503).send("error occured"+err)
    }
}

const adminregister = async(req,res)=>{

    try{

        if(req.result.role!="admin")
            throw new Error("invalid admin");

        validate(req.body);

        const {emailId,password} = req.body;
        
        req.body.password = await bcrypt.hash(password,10);
        req.body.role = "admin";
        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,emailId:emailId,role:"admin"},process.env.JWT_KEY, {expiresIn:"30m"});

        res.cookie("token",token,{maxAge:30*60*1000});
        res.status(201).send("admin registered successfully");
    }
    catch(err){
        res.status(400).send("error occured : " + err)
    }

}

const deleteProfile = async(req,res)=>{
    try{

        const userId = req.result._id;

        //user id deleted from user schema
        await User.findByIdAndDelete(userId);

        //sumbission schema info delete tooo
        await Submission.deleteMany({userId});

        res.status(200).send("deleted sucessfully");


    }
    catch(err){

        res.status(500).send("server error"+err)

    }
}

module.exports = {register,login,logout,adminregister,deleteProfile};