const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, x-auth-token, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', "true");
    next();
  });

app.use(express.json());


// directly use uri here for your convience
//const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://Junfeng:Junfeng@cluster0.5awtz.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/user')
const blockRouter = require('./routes/block');
const imageRouter = require('./routes/image');

app.use('/user', usersRouter);

app.use(cors()); 
app.use('/blocks', blockRouter);
app.use('/images', imageRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});