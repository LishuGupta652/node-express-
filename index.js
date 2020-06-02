const PORT = process.env.PORT || 4001;
const express = require("express");
const app = express();
const route = require("./routes/route");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://lishugupta652:lishugupta652@firstcluster-76qkd.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const db = mongoose.connection;
// db.on("error", console.log.bind(console, "connnection error"));

app.use("/user", route);

app.get("/", (req, res) => {
  res.send("homepage this is ");
});

app.listen(PORT, () => console.log(`App started at PORT ${PORT}`));
