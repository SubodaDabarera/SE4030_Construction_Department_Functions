import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { emailRegex, passwordRegex } from "../utill/regrex.js";
import logger from "../services/logger.js";

export const createUser = async (req, res) => {
  const { email, password, userRole } = req.body;

  logger.info(email ? "Email is received" : "Email is not received");
  logger.info(password ? "Password is received" : "Password is not received");

  // Validate email and password using regular expressions
  if (!emailRegex.test(email)) {
    logger.error("Invalid email address format");
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address" });
  }

  if (!passwordRegex.test(password)) {
    logger.error("Invalid password format");
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    logger.info(hashedPassword && "Password is hashed successfully");
    logger.warning(!hashedPassword && "Password is not hashed successfully");

    const user = await userModel.create({
      email,
      password: hashedPassword,
      userRole,
    });
    logger.info(user && "User is created successfully");
    logger.error(!user && "User created is not successful");
    return res.status(201).json({ success: true, user: user });
  } catch (err) {
    logger.error("Authentication error : ", err);
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};

// sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  logger.info(email ? "Email is received" : "Email is not received");
  logger.info(password ? "Password is received" : "Password is not received");

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      logger.info("User exists");
      if (bcrypt.compareSync(password, user.password) === true) {
        logger.info("User login successfull");
        return res
          .status(201)
          .json({ success: true, user: user, message: "Login success" });
      } else {
        logger.error("Passoword is incorrect");
        return res.status(500).json({
          success: false,
          user: null,
          message: "Invalid username or password",
        });
      }
    } else {
      logger.error("Email is incorrect");
      return res.status(500).json({
        success: false,
        user: null,
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    logger.error("Authentication error : ", err);
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.query;
  logger.info(userId ? "userId is received" : "userId is not received");

  try {
    const userDetails = await userModel
      .findById({ _id: userId })
      .then((user) => {
        logger.info("User data retrieved");
        if (!user) {
          logger.error("User is not found");
        }
        return res.status(201).json({ success: true, user: user });
      });
  } catch (err) {
    logger.error("User details not retrieved : ", err.message);
    res
      .status(500)
      .json({ success: false, message: "User data not retrieved" });
  }
};

// increment total spent amount for site manager
export const increment_SM_totalSpent = async (req, res) => {
  const { userId, amount } = req.body;
  logger.info(
    userId && amount
      ? "UserId and amout is received"
      : "UserId or amout is not received"
  );

  const userDetails = await userModel.findOne({ _id: userId });
  logger.info("User data retrieved");

  if (userDetails) {
    logger.info("User found");
    let previousTotal = userDetails.totalSpent;

    await userModel
      .findByIdAndUpdate(
        { _id: userId },
        { totalSpent: previousTotal + amount }
      )
      .then(() => {
        logger.info("Site manager total spent added");
        res
          .status(200)
          .send({ status: "Site manager total spent added", success: true });
      })
      .catch((err) => {
        logger.error("Site manager total spent is not added", err);
        res.status(500).json({
          success: false,
          message: "Site manager total spent is not added",
        });
      });
  }
};

// decrease total amount of site manager
export const decrement_SM_totalSpent = async (req, res) => {
  const { userId, amount } = req.body;
  logger.info(
    userId && amount
      ? "UserId and amout is received"
      : "UserId or amout is not received"
  );

  const userDetails = await userModel.findOne({ _id: userId });
  logger.info("User data retrieved");

  if (userDetails) {
    logger.info("User found");
    let previousTotal = userDetails.totalSpent;

    await userModel
      .findByIdAndUpdate(
        { _id: userId },
        { totalSpent: previousTotal - amount }
      )
      .then(() => {
        logger.info("Site manager total spent decreased");
        res.status(200).send({
          status: "Site manager total spent decreased",
          success: true,
        });
      })
      .catch((err) => {
        logger.error("Site manager total spent is not decreased", err);
        res.status(500).json({
          success: false,
          message: "Site manager total spent is not decreased",
        });
      });
  }
};
