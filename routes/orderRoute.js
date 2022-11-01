import express from "express";
import { getAllOrders, getOrderById, getOrderBySM, placeOrder, updateOrderById } from "../controllers/orderController.js";

var orderRouter = express.Router();
orderRouter.post("/place-order", placeOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/sm-order-details", getOrderBySM);
orderRouter.get("/order-details", getOrderById);
orderRouter.put("/update-order-status", updateOrderById);


export default orderRouter;