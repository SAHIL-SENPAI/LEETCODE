const {submitBatch,getLanguageById,submitToken} = require("../utils/problemUtility")
const Problem = require("../models/problem")
const User = require("../models/user");
const Submission = require("../models/submission");

const createProblem = async(req,res)=>{

    const {title,description,difficulty
        ,tags,visibleTestCases,hiddenTestCases,startCode
        ,referenceSolution,problemCreator
    } = req.body;

    try{

        for(const {language,completeCode} of referenceSolution){


            //source_code:completeCode
            //language_id:
            //stdin:
            //expectedOutput:

            const languageId = getLanguageById(language);
             
            // this is a batch format accepted by JUDGE0
            const submission = visibleTestCases.map((testcases)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output
            }))




            const submitResult = await submitBatch(submission)

            const resultToken = submitResult.map((value)=>value.token);
            console.log(resultToken);
            
            const testResult = await submitToken(resultToken)

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("error occured")
                }
            }
        }

        const userProblem = await Problem.create({
            ...req.body,
            problemCreator:req.result._id
        })

        res.status(201).send("Problem saved Successfully");
    }
    catch(err){
        res.status(400).send("Error" + err)
    }

}

const updateProblem = async(req,res)=>{

    const {id} = req.params;
    const {title,description,difficulty
        ,tags,visibleTestCases,hiddenTestCases,startCode
        ,referenceSolution,problemCreator
    } = req.body;

    try{

        if(!id){
            return res.status(400).send("missing id");
        }

        const DsaProblem = await Problem.findById(id);
        if(!DsaProblem){
            return res.status(400).send("id is not present in server")
        }

         for(const {language,completeCode} of referenceSolution){


            //source_code:completeCode
            //language_id:
            //stdin:
            //expectedOutput:

            const languageId = getLanguageById(language);
             
            // this is a batch format accepted by JUDGE0
            const submission = visibleTestCases.map((testcases)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output
            }))




            const submitResult = await submitBatch(submission)

            const resultToken = submitResult.map((value)=>value.token);
            
            const testResult = await submitToken(resultToken)

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("error occured")
                }
            }
        }

        //new true returns new updated document;
        const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

        res.status(200).send(newProblem);

    }
    catch(err){

        res.status(500).send("Error : "+err);

    }

}

const deleteProblem = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(400).send("ID is Missing");
        }

        const deletedProblem = await Problem.findByIdAndDelete(id);

        if(!deleteProblem){
            return res.status(404).send("Problem is missing");
        }

        res.status(200).send("deleted sucessfully");
        
    }
    catch(err){
        res.status(500).send("Error"+err);
    }
}

const getProblemById = async(req,res)=>{
    const {id} = req.params
    try{

         if(!id){
            return res.status(400).send("ID is Missing");
        }
        
        //send required field to user only not to send everything.
        const getProblem = await Problem.findById(id).select("_id title description difficulty tags visibleTestCases startCode referenceSolution");


        if(!getProblem){
            return res.status(404).send("Problem is missing");
        }

        res.status(200).send(getProblem);

    }
    catch(err){
        res.status(500).send("Err"+err)
    }
}
//add pagination here; 
const getAllProblem = async(req,res)=>{ 
    try{

        const getProblem = await Problem.find({}).select('title _id difficulty tags')

        if(getProblem.length==0){
            return res.status(404).send("Problem is missing");
        }

        res.status(200).send(getProblem);

    }
    catch(err){
        res.status(500).send("Err"+err)
    }
}

//learned .populate
const solvedAllProblembyUser = async(req,res)=>{
    try{

        const userId = req.result._id;

        //.populate will fetch the info of problem schema inside the problemSolved field which is present in out User schema 
        //so what we can not only send the count of total problem solved by user but also the information of all those problems.like difficulty tags and all;
        // const user =  await User.findById(userId).populate("problemSolved");
        //if we want selected fields;

        const user =  await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });
        
        res.status(200).send(user.problemSolved);

    }
    catch(err){
        res.status(500).send("server error"+err);
    }
}

const submittedProblem = async(req,res)=>{
    try{

        const userId = req.result._id;
        const problemid = req.params.id;

        const answer = await Submission.find({userId,problemid});

        if(ans.length==0){
            res.status(200).send("no submissions");
        }

        res.status(200).send(answer);


    }
    catch(err){

        res.status(500).send("internal server error"+err);

    }
}


module.exports = {solvedAllProblembyUser,getAllProblem,createProblem,updateProblem,deleteProblem,getProblemById,submittedProblem}; 