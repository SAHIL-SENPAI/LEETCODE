const express = require("express");
const usermiddleware = require("../middleware/usermiddleware");
const { submitCode,runCode } = require("../controllers/userSubmission");
const submitRouter = express.Router();





submitRouter.post("/submit/:id",usermiddleware,submitCode);
submitRouter.post("/run/:id",usermiddleware,runCode);



module.exports = submitRouter;