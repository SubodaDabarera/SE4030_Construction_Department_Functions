import express from "express";
import {
  addSupplier,
  getOneSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplierById,
} from "../controllers/supplierController.js";

var supplierRouter = express.Router();

supplierRouter.post("/add-supplier", addSupplier);
supplierRouter.get("/", getSuppliers);
supplierRouter.get("/:supplierId", getOneSupplier);
supplierRouter.delete("/:supplierId", deleteSupplier);
supplierRouter.put("update/:supplierId", updateSupplierById);

export default supplierRouter;
