import productModel from "../models/productModel.js";
import logger from "../services/logger.js";

export const addProduct = async (req, res) => {
  const { owner, title, unitPrice, quantity, location, description, imgUrl } =
    req.body;
  try {
    const newProduct = await productModel.create({
      owner,
      title,
      unitPrice,
      quantity,
      location,
      description,
      imgUrl,
    });
    logger.info("New Product Added");
    return res.status(201).json({ success: true, Product: newProduct });
  } catch (err) {
    logger.error("Product add is not successfull : ", err);
    res.status(400).json({ success: false, Product: [] });
  }
};

export const getProducts = async (req, res) => {
  productModel
    .find()
    .then((products) => {
      logger.info("All product details were retrieved");
      if (products.length === 0) {
        logger.info(
          "No products were found, Num of products : ",
          products.length
        );
      }
      res.json({ success: true, existingProducts: products });
    })
    .catch((err) => {
      logger.error("Product retrieve is not successfull : ", err);
      res.status(400).json({ success: false, existingProducts: [] });
    });
};

export const getOneProduct = async (req, res) => {
  const productId = req.params.productId;
  logger.info(productId ? "Product Id is found" : "Product Id is not found");

  productModel
    .findById({ _id: productId })
    .then((product) => {
      logger.info("Product retrieved");
      if (!product) {
        logger.info("No product in the database");
      }
      res.json({ success: true, existingProduct: product });
    })
    .catch((err) => {
      logger.error("Product retrieve is not successfull : ", err);
      res.status(400).json({ success: false, existingProducts: [] });
    });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  logger.info(productId ? "Product Id is found" : "Product Id is not found");

  productModel
    .findByIdAndDelete(productId)
    .then(() => {
      logger.info("Product deleted");
      res.status(200).send({ success: true, status: "Item deleted" });
    })
    .catch((err) => {
      logger.error("Product deletion is not successfull : ", err);
      res.status(400).json({ success: false, status: "Item is not deleted" });
    });
};

export const updateProductById = async (req, res) => {
  const productId = req.params.productId;
  const { owner, title, unitPrice, quantity, location, description } = req.body;
  logger.info(productId ? "Product Id is found" : "Product Id is not found");

  const updatedProduct = {
    owner,
    title,
    unitPrice,
    quantity,
    location,
    description,
  };

  productModel
    .findByIdAndUpdate(productId, updatedProduct)
    .then(() => {
      logger.info("Product Updated");
      res.status(200).send({ status: "product updated" });
    })
    .catch((err) => {
      logger.error("Product update is not successfull : ", err);
      res.status(400).json({ success: false, status: "Item is not updated" });
    });
};
