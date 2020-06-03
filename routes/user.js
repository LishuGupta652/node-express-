const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

// Middleware
const requireLogin = require("../middleware/requireLogin");

router.get("/allusers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
});

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

router.get("/", (req, res) => {
  res.json({ url: "user/allusers", signup: "user/signup :postroute" });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Please add all the fields " });
  }

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(400).json({ error: "Users already exists" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({ name, email, password: hashedPassword });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved user sucessfully" });
          })
          .catch((err) => {
            console.log("error while saving data");
          });
      });
    })
    .then((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email or password" });
  }
  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      return res.json({ error: "Invalid User. Please check credential" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // TODO : use jwt webtoken
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({ token });
        } else {
          return res
            .status(422)
            .json({ error: "Please provide email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/new", (req, res) => {
  res.send("Hey! u pretty new user");
});

module.exports = router;
