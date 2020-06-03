const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
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
      const user = new User({ name, email, password });
      user
        .save()
        .then((user) => {
          res.json({ message: "Saved user sucessfully" });
        })
        .catch((err) => {
          console.log("error while saving data");
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
