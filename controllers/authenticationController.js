import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { email, password, userRole } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await userModel.create({
      email,
      password: hashedPassword,
      userRole,
    });
    return res.status(201).json({ success: true, user: user });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      if (bcrypt.compareSync(password, user.password) === true) {
        return res
          .status(201)
          .json({ success: true, user: user, message: "Login success" });
      } else {
        return res
          .status(500)
          .json({ success: false, user: null, message: "Login unsuccess" });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, user: null, message: "Login unsuccess" });
    }
  } catch (e) {
    console.log(err);
    res.json(err);
  }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.query;

  try {
    const userDetails = await userModel
      .findById({ _id: userId })
      .then((user) => {
        return res.status(201).json({ success: true, user: user });
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// increment total spent amount for site manager
export const increment_SM_totalSpent = async (req, res) => {
  const { userId, amount } = req.body;

  const userDetails = await userModel.findOne({ _id: userId });

  if (userDetails) {
    let previousTotal = userDetails.totalSpent;

    await userModel
      .findByIdAndUpdate(
        { _id: userId },
        { totalSpent: previousTotal + amount }
      )
      .then(() => {
        res
          .status(200)
          .send({ status: "Site manager total spent added", success: true });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
};

// decrease total amount of site manager
export const decrement_SM_totalSpent = async (req, res) => {
  const { userId, amount } = req.body;

  const userDetails = await userModel.findOne({ _id: userId });

  if (userDetails) {
    let previousTotal = userDetails.totalSpent;

    await userModel
      .findByIdAndUpdate(
        { _id: userId },
        { totalSpent: previousTotal - amount }
      )
      .then(() => {
        res.status(200).send({
          status: "Site manager total spent decreased",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
};
