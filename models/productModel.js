import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  owner: {
    type: String,
    required: [true, "please enter owner's name "],
  },
  title: {
    type: String,
    required: [true, "please enter title"],
  },
  unitPrice: {
    type: Number,
    required: [true, "please enter unit price"],
  },
  quantity: {
    type: Number,
    required: [true, "please enter quantity"],
  },
  location: {
    type: String,
    required: [true, "please enter location"],
  },
  description: {
    type: String,
    required: constfalse,
  },
});

export default mongoose.model("Product", productSchema);
