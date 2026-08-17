const express = require("express");
const problemRouter = express.Router();
const adminmiddleware = require("../middleware/adminmiddleware")
const usermiddleware = require("../middleware/usermiddleware")
const {createProblem,solvedAllProblembyUser,updateProblem,deleteProblem,getProblemById,getAllProblem,submittedProblem} = require("../controllers/userProblem")
//only admins can do this 
problemRouter.post("/create",adminmiddleware,createProblem);
problemRouter.patch("/update/:id",adminmiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminmiddleware,deleteProblem);


//for normal users
problemRouter.get("/problemById/:id",usermiddleware,getProblemById);
problemRouter.get("/getAllProblem",usermiddleware,getAllProblem);
problemRouter.get("/problemSolvedByUser",usermiddleware,solvedAllProblembyUser);
problemRouter.get("/submittedProblem/:id",usermiddleware,submittedProblem)

module.exports = problemRouter;


