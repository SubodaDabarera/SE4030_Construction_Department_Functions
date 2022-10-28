import express from "express";
import {
  addProduct,
  getOneProduct,
  getProducts,
  deleteProduct,
  updateProductById,
} from "../controllers/productController.js";

var productRouter = express.Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getOneProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("update/:productId", updateProductById);

export default productRouter;
