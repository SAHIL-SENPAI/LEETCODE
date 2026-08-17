const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName:{
        required:true,
        type:String,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        isLowercase:true,
        immutable:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:5,
        max:80
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"problem"
        }],
        unique:true
    }
},{timestamps:true});

// UserSchema.post('findOneAndDelete',async function (userInfo){
//     if(userInfo){
//         await mongoose.model("submission").deleteMany({userId:userInfo._id});
//     }
// });

const User = mongoose.model("user",UserSchema);
module.exports = User;