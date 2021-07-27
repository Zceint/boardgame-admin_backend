const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const CategoryModel = mongoose.model("categorys", categorySchema, "category");

module.exports = CategoryModel;
