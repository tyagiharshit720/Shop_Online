const mongoose = require("mongoose");

const cartStructure = mongoose.Schema({
  color: String,
  amt: Number,
  prod: Object,
});

const car = mongoose.model("cart", cartStructure);
module.exports = {
  car,
};
