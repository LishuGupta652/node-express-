const PORT = process.env.PORT || 4001;
const express = require("express");
const app = express();
const { MONGO_URL } = require("./keys");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
require("./models/users");

const route = require("./routes/route");

try {
  mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });
  mongoose.connection.on("error", () => {
    console.log("error");
  });
} catch {
  console.log("error");
}
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

// const db = mongoose.connection;
// db.on("error", console.log.bind(console, "connnection error"));

app.use("/user", route);

app.get("/", (req, res) => {
  res.send("homepage this is ");
});

app.listen(PORT, () => console.log(`App started at PORT ${PORT}`));
