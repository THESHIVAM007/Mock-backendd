const express = require("express")
const cors = require("cors")
const {userController} = require("./routes/user.routes")
const {jobController} = require("./routes/job.routes")
const {connection} = require("./config/db")
const {authentication} = require("./middlewares/authentication")
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const PORT = 8080
app.use(compression()); 
app.use(helmet());

app.use(express.json())


app.use(cors())

// app.use("/user", userController)
// app.use(authentication)
app.use("/job", jobController)

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db")
    }
    catch(err){
        console.log("Error connnecting to DB")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})