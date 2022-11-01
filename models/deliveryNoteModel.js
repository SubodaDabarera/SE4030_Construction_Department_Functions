import mongoose from "mongoose";

const deliveryNoteModel = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "please enter order id"],
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    siteManagerMobile: {
      type: Number,
      required: [true, "please enter site manager's mobile number"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DeliveryNote", deliveryNoteModel);
