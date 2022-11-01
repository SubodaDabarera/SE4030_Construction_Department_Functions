import express from "express";
import { getAllOrders, getOrderById, getOrderBySM, placeOrder } from "../controllers/orderController.js";

var orderRouter = express.Router();
orderRouter.post("/place-order", placeOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/sm-order-details", getOrderBySM);
orderRouter.get("/order-details", getOrderById);

export default orderRouter;