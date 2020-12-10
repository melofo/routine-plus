const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

const uri = "mongodb+srv://zjf:chaos23@cluster0.4uxkv.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});

const blockRouter = require('./routes/block');
const imageRouter = require('./routes/image');

app.use(cors()); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use('/blocks', blockRouter);
app.use('/images', imageRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});