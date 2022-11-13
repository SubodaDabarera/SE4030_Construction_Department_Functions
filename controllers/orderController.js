import orderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const {
    ownerId,
    owner,
    title,
    siteManager,
    siteManagerName,
    productId,
    unitPrice,
    quantity,
    totalAmount,
  } = req.body;
  try {
    const newOrder = await orderModel.create({
      ownerId,
      owner,
      title,
      siteManager,
      siteManagerName,
      productId,
      unitPrice,
      quantity,
      totalAmount,
    });
    return res.status(201).json({ success: true, Product: newOrder });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// get all orders
export const getAllOrders = async (req, res) => {
  orderModel
    .find()
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get orders which are in pending state
export const getAllOrdersByStatus = async (req, res) => {
  orderModel
    .find({ status: "pending" })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get orders which are assigned to top procurement manager
export const getTopPMAllRequestedOrders = async (req, res) => {
  orderModel
    .find({ status: "topManager" })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get order by site manager's id
export const getOrderBySM = async (req, res) => {
  const { siteManager } = req.query;
  console.log(siteManager);
  orderModel
    .find({ siteManager })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// get order by orderId
export const getOrderById = async (req, res) => {
  const { orderId } = req.query;

  orderModel
    .findById(orderId)
    .then((order) => {
      res.json({ success: true, order: order });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const updateOrderById = async (req, res) => {
  // const { orderId, status } = req.body;
  const { orderId } = req.body.orderId;
  const { updateOrder } = req.body.orderId;

  const updatedOrder = {
    status: updateOrder,
  };

  orderModel
    .findByIdAndUpdate({ _id: orderId }, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order status updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// update the quantity of order
export const updateOrderQty = async (req, res) => {
  const { orderId, quantity } = req.body;

  const updatedOrder = {
    quantity: quantity,
  };

  orderModel
    .findByIdAndUpdate({ _id: orderId }, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order status updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// update partial order approved quantity
export const updatePartialOrderQty = async (req, res) => {
  const { orderId, partialyApprovedQty, unitPrice } = req.body;

  const updatedOrder = {
    partialyApprovedQty: partialyApprovedQty,
    approvedTotalAmount: unitPrice * partialyApprovedQty,
  };

  orderModel
    .findByIdAndUpdate({ _id: orderId }, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order status updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// delete orders
export const deleteOrder = async (req, res) => {
  const { orderId } = req.query;

  orderModel
    .findByIdAndDelete(orderId)
    .then(() => {
      res.status(200).send({ status: "Item deleted " });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// get orders which are in approoved state
export const getAllApprovedOrders = async (req, res) => {
  orderModel
    .find({ status: "approved" })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get orders which are in declined state
export const getAllDeclinedOrders = async (req, res) => {
  orderModel
    .find({ status: "rejected" })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get orders which are in pending state
export const getAllPendingOrders = async (req, res) => {
  orderModel
    .find({ status: "pending" })
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// update delivery note added status
export const updateDeliveryNoteStatus = async (req, res) => {
  const { orderId, status } = req.body;

  const updatedOrder = {
    deliveryNoteAdded: status,
  };

  orderModel
    .findByIdAndUpdate({ _id: orderId }, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order status updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};
