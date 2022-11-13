import deliveryNoteModel from "../models/deliveryNoteModel.js";

export const addDeliveryNote = async (req, res) => {
  const { orderId, zip, city, province, siteManagerMobile } = req.body;
  try {
    const deliveryNote = await deliveryNoteModel.create({
      orderId,
      zip,
      city,
      province,
      siteManagerMobile,
    });
    return res.status(201).json({ success: true, note: deliveryNote });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// get delivery details by id
export const getDeliveryByOrderId = async (req, res) => {
  const { orderId } = req.query;

  deliveryNoteModel
    .find({orderId})
    .then((delivery) => {
      res.json({ success: true, order: delivery });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};