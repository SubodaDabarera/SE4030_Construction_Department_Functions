import express from "express";
import {
  createUser,
  decrement_SM_totalSpent,
  getUserDetails,
  increment_SM_totalSpent,
  signIn,
} from "../controllers/authenticationController.js";

var userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/signIn", signIn);
userRouter.get("/get-user-details", getUserDetails);
userRouter.put("/increment-sm-totalSpent", increment_SM_totalSpent);
userRouter.put("/decrement-sm-totalSpent", decrement_SM_totalSpent);

export default userRouter;
