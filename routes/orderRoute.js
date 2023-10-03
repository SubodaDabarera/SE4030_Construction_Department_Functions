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
import verifyUser from "../middleware/authMiddleware.js";

var orderRouter = express.Router();
orderRouter.post("/place-order",verifyUser, placeOrder);
orderRouter.get("/",verifyUser, getAllOrders);
orderRouter.get("/by-order-status", verifyUser, getAllOrdersByStatus);
orderRouter.get("/by-topPM-order-status", verifyUser, getTopPMAllRequestedOrders);
orderRouter.get("/sm-order-details", verifyUser, getOrderBySM);
orderRouter.get("/order-details", verifyUser, getOrderById);
orderRouter.put("/update-order-status", verifyUser, updateOrderById);
orderRouter.put("/update-order-qty", verifyUser, updateOrderQty);
orderRouter.put("/update-partial-order-qty", verifyUser, updatePartialOrderQty);
orderRouter.put("/update-deliveryNote-status", verifyUser, updateDeliveryNoteStatus);
orderRouter.delete("/delete-order", verifyUser, deleteOrder);
orderRouter.get("/approved-orders", verifyUser, getAllApprovedOrders);
orderRouter.get("/declined-orders", verifyUser, getAllDeclinedOrders);
orderRouter.get("/pending-orders", verifyUser, getAllPendingOrders);
orderRouter.get("/order-details/:orderId", verifyUser, getOrderByParmsId);
orderRouter.get("/confirmed-orders", verifyUser, getAllConfiremedOrders);

export default orderRouter;
