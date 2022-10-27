import supplierModel from "../models/supplierModel";

export const addSupplier = async (req, res) => {
  const { name, email, address, telephone } = req.body;

  try {
    const newSupplier = await supplierModel.create({
      name,
      email,
      address,
      telephone,
    });
    return res.status(201).json({ success: true, supplier: newSupplier });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const getSuppliers = async (req, res) => {
  supplierModel
    .find()
    .then((suppliers) => {
      res.json({ success: true, existingSuppliers: suppliers });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

export const getOneSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  supplierModel
    .findByID({ _id: supplierId })
    .then((supplier) => {
      res.json({ success: true, existingSupplier: supplier });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const deleteSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  supplierModel
    .findByIDAndDelete(supplierId)
    .then(() => {
      res.status(200).send({ status: "Supplier deleted " });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const updateSupplierById = async (req, res) => {
  const supplierId = req.params.supplierId;

  const { name, email, address, telephone } = req.body;

  const updatedSupplier = {
    name,
    email,
    address,
    telephone,
  };

  productModel
    .findByIDAndUpdate(supplierId, updatedSupplier)
    .then(() => {
      res.status(200).send({ status: "Supplier updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};
