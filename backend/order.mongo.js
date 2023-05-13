const mongoose = require("mongoose");

const Structure = mongoose.Schema({
  total_ammot: Number,
  //shippingfee: Number,
  final_ammot: Number,
});

const rec = mongoose.model("order", Structure);
module.exports = {
  rec,
};
