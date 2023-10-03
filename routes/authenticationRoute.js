import express from "express";
import {
  createUser,
  decrement_SM_totalSpent,
  getUserDetails,
  increment_SM_totalSpent,
  signIn,
} from "../controllers/authenticationController.js";
import { checkAccessLevel, verifyUser } from "../middleware/authMiddleware.js";

var userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/signIn", signIn);
userRouter.get(
  "/get-user-details",
  verifyUser,
  checkAccessLevel,
  getUserDetails
);
userRouter.put(
  "/increment-sm-totalSpent",
  verifyUser,
  checkAccessLevel,
  increment_SM_totalSpent
);
userRouter.put(
  "/decrement-sm-totalSpent",
  verifyUser,
  checkAccessLevel,
  decrement_SM_totalSpent
);

export default userRouter;
