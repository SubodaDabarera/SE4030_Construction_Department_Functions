import express from "express";
import {
  addProduct,
  getOneProduct,
  getProducts,
  deleteProduct,
  updateProductById,
} from "../controllers/productController.js";
import { checkAccessLevel, verifyUser } from "../middleware/authMiddleware.js";

var productRouter = express.Router();

productRouter.post("/add-product", verifyUser, checkAccessLevel, addProduct);
productRouter.get("/", verifyUser, checkAccessLevel, getProducts);
productRouter.get("/:productId", verifyUser, checkAccessLevel, getOneProduct);
productRouter.delete(
  "/:productId",
  verifyUser,
  checkAccessLevel,
  deleteProduct
);
productRouter.put(
  "/update/:productId",
  verifyUser,
  checkAccessLevel,
  updateProductById
);

export default productRouter;
