import productModel from "../models/productModel.js";

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
    return res.status(201).json({ success: true, Product: newProduct });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const getProducts = async (req, res) => {

  productModel
    .find()
    .then((products) => {
      res.json({ success: true, existingProducts: products });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

export const getOneProduct = async (req, res) => {
  const productId = req.params.productId;

  productModel
    .findById({ _id: productId })
    .then((product) => {
      res.json({ success: true, existingProduct: product });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  productModel
    .findByIdAndDelete(productId)
    .then(() => {
      res.status(200).send({ status: "Item deleted " });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const updateProductById = async (req, res) => {
  const productId = req.params.productId;

  console.log(productId);

  const { owner, title, unitPrice, quantity, location, description } = req.body;

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
      res.status(200).send({ status: "product updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};
