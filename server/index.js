const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

mongoose.connect("mongodb+srv://shubhangibillo:w6OggW0ikpWJH6Lw@cluster0.vpe50zt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.get('/getUsers',(_req,res) =>{
    UserModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


app.listen(3001,()=>{
    console.log("server is running")
})