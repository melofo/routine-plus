const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Passport = require("passport");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin':'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Credentials': 'true',
    })
    next();
  });

// app.use(cors());
app.use(express.json());

// Passport configuration
app.use(require("express-session")({
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser("thisisasecret"));
app.use(Passport.initialize());
app.use(Passport.session());

// directly use uri here 
//const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://zjf:chaos23@cluster0.4uxkv.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/user')
const blockRouter = require('./routes/block');
const imageRouter = require('./routes/image');

app.use('/user', usersRouter);
app.use(cors()); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use('/blocks', blockRouter);
app.use('/images', imageRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});