import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: [true, "please enter owner id"],
  },
  siteManager: {
    type: String,
    required: [true, "please enter site manager's id"],
  },
  productId: {
    type: String,
    required: [true, "please enter Product id"],
  },
  unitPrice: {
    type: Number,
    required: [true, "please enter unit price"],
  },
  quantity: {
    type: Number,
    required: [true, "please enter quantity"],
  },
  
}, {
  timestamp: true
});

export default mongoose.model("Order", orderSchema);
