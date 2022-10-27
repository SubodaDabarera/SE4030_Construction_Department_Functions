import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name "],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
  },
  address: {
    type: String,
    required: [true, "please enter address"],
  },
  telephone: {
    type: Number,
    required: [true, "please enter telephone"],
  },
});

export default mongoose.model("supplier", supplierSchema);
