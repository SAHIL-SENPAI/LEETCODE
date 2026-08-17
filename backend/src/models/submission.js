const mongoose = require("mongoose");
const {Schema} = mongoose;

const submissionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:"problem",
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        require:true,
        enum:['javascript','c++','java'] 
    },
    status:{
        type:String,
        enum:['pending','accepted','wrong','error'],
        default:'pending'
    },
    runtime:{
        type:Number,
        default:0
    },
    memory:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:""
    },
    testCasesPassed:{
        type:Number,
        default:0
    },
    testCasesTotal:{
        type:Number,
        default:0
    }
},{timestamps:true});

//creating compound indexing so that we can find this data easily without have to traverse in all the db;
//1 means asseccending order, -1 for decending order

//_id has its own index, and unique:true also have a index and lastly if we mark index:true;
submissionSchema.index({userId:1,problemId:1});

const Submission = mongoose.model("problme",submissionSchema);

module.exports = Submission;