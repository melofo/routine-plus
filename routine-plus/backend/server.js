const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

<<<<<<< 4f72526b3c17dc078f5884db9eccf68aa34f9fdb
const uri = "mongodb+srv://zjf:chaos23@cluster0.4uxkv.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
=======

// directly use uri here for your convience
//const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://Junfeng:Junfeng@cluster0.5awtz.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
>>>>>>> app.js fnished
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});

<<<<<<< 4f72526b3c17dc078f5884db9eccf68aa34f9fdb

=======
>>>>>>> app.js fnished
const usersRouter = require('./routes/user')
const blockRouter = require('./routes/block');
const imageRouter = require('./routes/image');

<<<<<<< 4f72526b3c17dc078f5884db9eccf68aa34f9fdb
app.use(cors()); 
app.use('/blocks', blockRouter);
app.use('/images', imageRouter);
app.use('/user', usersRouter);


=======
app.use('/user', usersRouter);
app.use(cors()); 
app.use('/blocks', blockRouter);
app.use('/images', imageRouter);
>>>>>>> app.js fnished

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});