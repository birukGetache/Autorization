const express =require('express');
const mongo = require("mongoose");
const schema = require('./schema');
const { Types: {ObjectId} } = require('mongoose')
const cors = require('cors');
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
app.use(express.json());
app.use(cors());
app.post('/signup',(req,res)=>{
    const body = req.body;
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
    console.log("I am getting");
    schema.find({
        firstName:"Biruk"})
    .then((result)=>{
        console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
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