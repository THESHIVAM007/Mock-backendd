const { Router } = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const cors = require("cors")

const { JobModel } = require("../models/job.model")
const { UserModel } = require("../models/User.model")

const jobController = Router();

jobController.use(cors())
// {
//     "params": {
//         "genre": [
//             "Backend Developer"
//         ],
//         "_sort": null,
//         "_order": null
//     }
// }

jobController.get("/", async (req, res) => {
    console.log(req.query);
    let params = req.query;
    // const genre = params.genre[0]||"";
    const sort = params._sort ==  "asc" ? 1 : -1;
    const query = params._q;
    console.log(sort,query)

    
    
     const data = await JobModel.find({ language: new RegExp(query, "i") }).sort({"postedAt": `${sort}`})
    //  const filteredUsers = data.filter(user => {
    //     return user.role == genre
    //   });
    //   res.send(filteredUsers);
   res.send(data)
})




jobController.post("/create", async (req, res) => {
    console.log(req.body);
    const newJob = new JobModel(req.body)
    // console.log(newTicket)
    try {
       
        await newJob.save()
       

        res.send("New Job created")
    }
    catch (err) {
        res.send("something went wrong")
    }
})









module.exports = {
    jobController
}