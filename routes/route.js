const express = require("express");

const router = express.Router();

const users = [
  {
    id: "1",
    name: "lishu",
  },
  {
    id: "2",
    name: "tarun",
  },
  {
    id: "3",
    name: "guptas",
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.get("/new", (req, res) => {
  res.send("Hey! u pretty new user");
});

module.exports = router;
