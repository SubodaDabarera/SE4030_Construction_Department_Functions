import express from "express";
import { addDeliveryNote } from "../controllers/deliveryNoteController.js";

var deliveryNoteRouter = express.Router();
deliveryNoteRouter.post("/add-delivery-note", addDeliveryNote);

export default deliveryNoteRouter;