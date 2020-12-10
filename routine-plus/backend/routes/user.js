const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

require("../passportConfig")(passport);

// add user
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User added!");
    }
  });
});


// log in
router.post("/login", passport.authenticate("local"), (req, res)=>{
  res.send({
    logged_in: true,
    user: req.user.username
  });
});


// log out
router.get("/logout", function(req,res){
  req.logout();
  res.send("success!!!!!")
});


// get current user
router.get("/", (req, res) => {
  if (req.user){
    res.send({
      logged_in: true,
      user: req.user.username
    });
  } else {
    res.send({
      logged_in: false,
      user: null
    });
  }
    
});


module.exports = router;