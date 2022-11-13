import express from "express";
import { addDeliveryNote, getDeliveryByOrderId } from "../controllers/deliveryNoteController.js";

var deliveryNoteRouter = express.Router();
deliveryNoteRouter.post("/add-delivery-note", addDeliveryNote);
deliveryNoteRouter.get("/get-deliveryNote-order", getDeliveryByOrderId);

export default deliveryNoteRouter;