import express from "express";
import {
  addSupplier,
  getOneSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplierById,
} from "../controllers/supplierController.js";
import { checkAccessLevel, verifyUser } from "../middleware/authMiddleware.js";

var supplierRouter = express.Router();

supplierRouter.post("/add-supplier",verifyUser, checkAccessLevel, addSupplier);
supplierRouter.get("/",verifyUser, checkAccessLevel, getSuppliers);
supplierRouter.get("/:supplierId",verifyUser, checkAccessLevel, getOneSupplier);
supplierRouter.delete("/:supplierId",verifyUser, checkAccessLevel, deleteSupplier);
supplierRouter.put("update/:supplierId",verifyUser, checkAccessLevel, updateSupplierById);

export default supplierRouter;
