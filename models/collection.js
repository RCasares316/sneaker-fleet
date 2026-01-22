const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  bodyStyle: { type: String, required: true },
  variant: { type: String },
  releaseYear: { type: String, required: true },
  colorPattern: { type: String, required: true },
  forSale: { type: String },
  price: { type: String, required: true},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Collection", collectionSchema);
