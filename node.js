const express =require('express');
const mongo = require("mongoose");
const schema = require('./schema');
const { Types: {ObjectId} } = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const crypto = require('crypto');
mongo.connect("mongodb://localhost:27017/")
.then((result)=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err);
})
const app = express();
app.listen(3000,(result,err)=>{
    console.log("we are listen ing in 3000")
});
//cred operation
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(session({
    genid: () =>crypto.randomBytes(20).toString('hex'),
    secret:"anson the dev",
    saveUninitialized:false,//you do not need to save unmodified session data
    resave:false,
    cookie:{
        maxAge: 60000 * 60,
        secure: false
    }
}))
app.post('/signup',(req,res)=>{
    const body = req.body;
    if (req.session.id) {
        console.log('You have visited before!');
      } else {
        console.log('Welcome to the app!');
      }
    console.log(body);
    const user = new schema({firstName:body.firstName,lastName:body.lastName,email:body.email});
    user.save()
    .then((result)=>{
        res.send(result);
        console.log("send");
    })
    .catch((err)=>{
        res.send(err)
})})
app.get("/get",(req,res)=>{
    req.session.visited = true;
    console.log(req.session.id);
    if (req.session.visited) {
        console.log('You have visited before!');
      } else {
        console.log('Welcome to the app!');
      }
    schema.find({
        firstName:"Biruk"})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({ error: "An error occurred while querying the database." });
    })
});
app.put('/update', (req, res) => {
    const updateData = req.body;
    console.log('Update data:', updateData);
  
    schema.findByIdAndUpdate(new ObjectId('661665ce67a45d332a601729'), updateData.updateUser, { new: true })
      .then((result) => {
        console.log('Updated document:', result);
      })
      .catch((err) => {
        console.error('Error updating document:', err);
        res.status(500).send({ error: 'Error updating document' });
      });
    });
app.delete('/delete',(req,res)=>{
    schema.findByIdAndDelete(new ObjectId('661665ce67a45d332a601729'))
    .then((result)=>{
        console.log("deleted"+result)
    })
})
app.post('/login',(req,res)=>{
    //it modify the above session so the session id goes twice 
})
 //jwt
