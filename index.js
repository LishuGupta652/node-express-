const PORT = process.env.PORT || 4001;
const express = require("express");
const app = express();
const { MONGO_URL } = require("./keys");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
require("./models/users");
require("./models/post");

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

try {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });
  mongoose.connection.on("error", () => {
    console.log("error while connection");
  });
} catch (err) {
  console.log(err);
}

app.use("/user", userRoute);
app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.send("homepage this is ");
});

app.listen(PORT, () => console.log(`App started at PORT ${PORT}`));
