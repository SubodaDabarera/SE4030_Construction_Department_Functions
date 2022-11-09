import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: [true, "please enter owner id"],
    },
    owner: {
      type: String,
    },
    title: {
      type: String,
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
    status: {
      type: String,
      default: "pending",
    },
    partialyApprovedQty: {
      type: Number,
    },
    approvedTotalAmount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: [true, "please enter total amount"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
