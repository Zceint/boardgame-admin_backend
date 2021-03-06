const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
const uri = "mongodb+srv://admin:admin@cluster0.ykh2p.mongodb.net/test?retryWrites=true&w=majority";
const UserModel = require("./models/User");
const CategoryModel = require("./models/Category");

app.use(express.json());
app.use(cors());

//Check User login
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

//Add Category
app.post("/category/add", (req, res) => {
  const { name } = req.body;
  console.log(name);
  CategoryModel.create({ name })
    .then((category) => {
      res.send({ status: 0, data: category });
    })
    .catch((error) => {
      console.error("Add Category Error", error);
      res.send({ status: 1, msg: "Add Category Error" });
    });
});

// // Get Category Error
// router.get("/manage/category/list", (req, res) => {
//   const parentId = req.query.parentId || "0";
//   CategoryModel.find({ parentId })
//     .then((categorys) => {
//       res.send({ status: 0, data: categorys });
//     })
//     .catch((error) => {
//       console.error("Get Category Error", error);
//       res.send({ status: 1, msg: "Get Category Error" });
//     });
// });

// // Update Category Error
// router.post("/manage/category/update", (req, res) => {
//   const { categoryId, categoryName } = req.body;
//   CategoryModel.findOneAndUpdate({ _id: categoryId }, { name: categoryName })
//     .then((oldCategory) => {
//       res.send({ status: 0 });
//     })
//     .catch((error) => {
//       console.error("Update Category Error", error);
//       res.send({ status: 1, msg: "Update Category Error" });
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", function () {
  console.log("mongoDB cluster connected");
});
