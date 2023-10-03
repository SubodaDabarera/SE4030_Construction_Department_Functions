import express from "express";
import {
  addProduct,
  getOneProduct,
  getProducts,
  deleteProduct,
  updateProductById,
} from "../controllers/productController.js";
import verifyUser from "../middleware/authMiddleware.js";

var productRouter = express.Router();

productRouter.post("/add-product", verifyUser, addProduct);
productRouter.get("/", verifyUser, getProducts);
productRouter.get("/:productId", verifyUser, getOneProduct);
productRouter.delete("/:productId", verifyUser, deleteProduct);
productRouter.put("/update/:productId", verifyUser, updateProductById);

export default productRouter;
