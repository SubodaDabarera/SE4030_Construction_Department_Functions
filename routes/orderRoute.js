import express from "express";
import {
  deleteOrder,
  getAllApprovedOrders,
  getAllDeclinedOrders,
  getAllPendingOrders,
  getAllOrders,
  getAllOrdersByStatus,
  getOrderById,
  getOrderBySM,
  getTopPMAllRequestedOrders,
  placeOrder,
  updateDeliveryNoteStatus,
  updateOrderById,
  updateOrderQty,
  updatePartialOrderQty,
  getOrderByParmsId,
  getAllConfiremedOrders,
} from "../controllers/orderController.js";

var orderRouter = express.Router();
orderRouter.post("/place-order", placeOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/by-order-status", getAllOrdersByStatus);
orderRouter.get("/by-topPM-order-status", getTopPMAllRequestedOrders);
orderRouter.get("/sm-order-details", getOrderBySM);
orderRouter.get("/order-details", getOrderById);
orderRouter.put("/update-order-status", updateOrderById);
orderRouter.put("/update-order-qty", updateOrderQty);
orderRouter.put("/update-partial-order-qty", updatePartialOrderQty);
orderRouter.put("/update-deliveryNote-status", updateDeliveryNoteStatus);
orderRouter.delete("/delete-order", deleteOrder);
orderRouter.get("/approved-orders", getAllApprovedOrders);
orderRouter.get("/declined-orders", getAllDeclinedOrders);
orderRouter.get("/pending-orders", getAllPendingOrders);
orderRouter.get("/order-details/:orderId", getOrderByParmsId);
orderRouter.get("/confirmed-orders", getAllConfiremedOrders);

export default orderRouter;
