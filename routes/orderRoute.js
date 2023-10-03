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
import {checkAccessLevel, verifyUser} from "../middleware/authMiddleware.js";

var orderRouter = express.Router();
orderRouter.post("/place-order",verifyUser,checkAccessLevel, placeOrder);
orderRouter.get("/",verifyUser,checkAccessLevel, getAllOrders);
orderRouter.get("/by-order-status", verifyUser,checkAccessLevel, getAllOrdersByStatus);
orderRouter.get("/by-topPM-order-status", verifyUser,checkAccessLevel, getTopPMAllRequestedOrders);
orderRouter.get("/sm-order-details", verifyUser,checkAccessLevel, getOrderBySM);
orderRouter.get("/order-details", verifyUser,checkAccessLevel, getOrderById);
orderRouter.put("/update-order-status", verifyUser,checkAccessLevel, updateOrderById);
orderRouter.put("/update-order-qty", verifyUser,checkAccessLevel, updateOrderQty);
orderRouter.put("/update-partial-order-qty", verifyUser,checkAccessLevel, updatePartialOrderQty);
orderRouter.put("/update-deliveryNote-status", verifyUser,checkAccessLevel, updateDeliveryNoteStatus);
orderRouter.delete("/delete-order", verifyUser,checkAccessLevel, deleteOrder);
orderRouter.get("/approved-orders", verifyUser,checkAccessLevel, getAllApprovedOrders);
orderRouter.get("/declined-orders", verifyUser,checkAccessLevel, getAllDeclinedOrders);
orderRouter.get("/pending-orders", verifyUser,checkAccessLevel, getAllPendingOrders);
orderRouter.get("/order-details/:orderId", verifyUser,checkAccessLevel, getOrderByParmsId);
orderRouter.get("/confirmed-orders", verifyUser,checkAccessLevel, getAllConfiremedOrders);

export default orderRouter;
