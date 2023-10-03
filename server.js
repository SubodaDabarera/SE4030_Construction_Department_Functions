import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/authenticationRoute.js";
import productRouter from "./routes/productRoute.js";
import supplierRouter from "./routes/supplierRoute.js";
import orderRouter from "./routes/orderRoute.js";
import deliveryNoteRouter from "./routes/deliveryNoteRoute.js";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

try {
  mongoose.set('strictQuery', true)
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected successfully : ${conn.connection.host}`);
} catch (error) {
  console.log(
    "MongoDB connect error occurred. Please check your MongoDB_URI is connected"
  );
  console.log(error);

  process.exit(1);
}

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/order", orderRouter);
app.use("/api/deliveryNote", deliveryNoteRouter);

app.listen(port, () => console.log(`Server run on port : ${port}`));
