const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const client = require("./config/redis")
const problemRouter = require("./routes/problemCreator")
const submitRouter = require("./routes/submit");
const cors = require("cors");

//only our front end can request this;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


//for parcing json object and cookies to js object
app.use(express.json());
app.use(cookieparser());

app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submitRouter);




const initializeConnection = async ()=>{
    try{
       await Promise.all([main(),client.connect()]);
       console.log("db connected");

       app.listen(process.env.PORT,()=>{
            console.log("listening at port" + process.env.PORT);
        })
    }
    catch(err){
        console.log("error" + err)
    }
}

initializeConnection()



