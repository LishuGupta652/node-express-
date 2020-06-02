const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  console.log("working started");
  User.find().then((users) => {
    console.log("working tiil now");
    res.send(users);
  });
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Please add all the fields " });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.sendStatus(400).json({ error: "Users already exists" });
      }
      const user = new User({ name, email, password });
      user
        .save()
        .then((user) => {
          res.json({ message: "Saved user sucessfully", data: user });
        })
        .catch((err) => {
          console.log("error");
        });
    })
    .then((err) => {
      console.log(err);
    });
});

router.get("/new", (req, res) => {
  res.send("Hey! u pretty new user");
});

module.exports = router;
