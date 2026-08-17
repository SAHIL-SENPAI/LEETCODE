
const Problem = require("../models/problem");
const Submission = require("../models/submission")
const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility")

const submitCode = async(req,res) =>{

    try{

        const userId = req.result._id;
        const problemId = req.params.id;
        const {code,language} = req.body;

        if(!userId||!problemId||!code||!language){
            return res.status(400).send("some field missing")
        }
        
        //fetching prob from db so we can run hidden test cases on the problem 
        const problem = await Problem.findById(problemId);

        //storing submition first in db then use judge0 for result and then update submissionn
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed:0,
            status:'panding',
            testCasesTotal:problem.hiddenTestCases.length
        })

        //submit code to judge0
        const languageId = getLanguageById(language);
        
        const submission = problem.hiddenTestCases.map((testcases)=>({
            source_code:code,
            language_id:languageId,
            stdin:testcases.input,
            expected_output:testcases.output
        }))

        const submitResult = await submitBatch(submission);

        const resultToken = submitResult.map((value)=>value.token);

        const testResult = await submitToken(resultToken);

        //lets update the submission that was in db;

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'accepted';
        let errorMessage = null;

        for(const test of testResult){
            if(test.status_id==3){
                testCasesPassed++;
                runtime = runtime + parseFloat(test.time);
                memory = Math.max(memory,test.memory);
            }
            else{
                if(test.status_id==4){
                    status = 'error';
                    errorMessage = test.stderr
                }
                else{
                    status = 'wrong';
                    errorMessage = test.stderr

                }

            }

        }

        //now store the result in database;(submission)
        submittedResult.status = status;
        submittedResult.testCasesPassed = testCasesPassed;
        submittedResult.errorMessage = errorMessage;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();

        //pushinng inside problem solved in user modle
        //problemid to be inserted in userschema inside problemsolved feild if it is not present there
        if(!req.result.problemSolved.includes(problemId)){
            req.result.problemSolved.push(problemId)
            await req.result.save()
        }

        res.status(200).send(submittedResult);


    }
    catch(err){

        res.status(500).send("internal server error"+err);

    }

}

const runCode = async(req,res)=>{
    try{

        const userId = req.result._id;
        const problemId = req.params.id;
        const {code,language} = req.body;

        if(!userId||!problemId||!code||!language){
            return res.status(400).send("some field missing")
        }
        
        const problem = await Problem.findById(problemId);


        //submit code to judge0
        const languageId = getLanguageById(language);
        
        const submission = problem.visibleTestCases.map((testcases)=>({
            source_code:code,
            language_id:languageId,
            stdin:testcases.input,
            expected_output:testcases.output
        }))

        const submitResult = await submitBatch(submission);

        const resultToken = submitResult.map((value)=>value.token);

        const testResult = await submitToken(resultToken);
        
        res.status(200).send(testResult);


    }
    catch(err){

        res.status(500).send("internal server error"+err);

    }
}


module.exports = {submitCode,runCode}