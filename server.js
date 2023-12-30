const express = require("express"); // help you set up server
const mongoose = require("mongoose"); // make it EASY TO MAKE SCEHEMA AND CONNECT TO DATABASE
const cors = require("cors"); // WHEN WE ARE CONNECTING, HELP MINIMIZE ERROR
const bodyParser = require("body-parser"); // HELP PARSE DATA INTO JSON
const bcrypt = require("bcrypt"); // HASH OUR PASSWORD
const jwt = require("jsonwebtoken"); //THAT FOLLOWS USER AS THEY ARE CREEATED AND IS DELETED WHEN THEY ARE REMOVED
const User = require("./models/userSchema");

const SECRET_KEY = "secretkey"

//mongodb+srv://user:userpassword@cluster1.flafzzu.mongodb.net/?retryWrites=true&w=majority

//CONNECT TO EXPRESS
const app = express();

//CONNECT TO MONGO DB
const DBURL =
  "mongodb+srv://user:userpassword@cluster1.flafzzu.mongodb.net/UsersDB?retryWrites=true&w=majority";

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is connected to port 3001 and conncted to MongoDB");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to server &/or MongoDb");
  });

//MIDDLEWEAR
// We are using express in order to user bodyParser and cors

app.use(bodyParser.json());
app.use(cors);

//SCHEMA

//ROUTE
// ---->For User Registration
//Create - POST   *****
app.post("/register", async (req, res) => {
  //Were using express app to post data into the path
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User Successfully Created" });
  } catch (error) {
    res.status(500).json({ message: "Error signing in " });
  }
})

//Read - GET   *****
 //Get rrequest for Registered User
app.get("/register", async(req, res)=>{
 try{
  const users = await User.find()
  res.status(201).json(users)
 }catch(error){
  res.status(500).json({message:"User not found!"})
 }

})

//POST REQUEST FOR LOGIN USER

app.post("/login", async(req, res)=> {
  try{
    const {username, password} =req.body
    const user = await User.findOne({username})
    if(!user){
      res.status(401).json({error: "Invlid Credentials"})
    }
    const isPasswordValid =  await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      res.status(401).json({error: "Invlid Credentials"})
    }
    const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn : "1hr"})
    res.json({message: "Log In successful"})
  }catch(error){
    res.status(500).json({error:"Error Logging  In!", error})

  }

})


//U -POST
//D
