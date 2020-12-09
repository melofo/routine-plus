const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// directly use uri here 
//const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://Junfeng:Junfeng@cluster0.5awtz.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});

//use route here
// const usersRouter = require('./routes/user')
// const routineRouter = require('./routes/routine');

// app.use('/user', usersRouter);
// app.use('/routine', routineRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});