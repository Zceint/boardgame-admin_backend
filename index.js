const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
const uri = "mongodb+srv://admin:admin@cluster0.ykh2p.mongodb.net/test?retryWrites=true&w=majority";
const UserModel = require("./models/User");

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log("login success");
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
        res.send({ status: 0, data: user });
      } else {
        res.send({ status: 1, msg: "incorrect email or password" });
      }
    })
    .catch((error) => {
      res.send({ status: 1, msg: error.toString() });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", function () {
  console.log("mongoDB cluster connected");
});
