import express from 'express'
import {createUser, getUserDetails} from '../controllers/authenticationController.js'

var userRouter = express.Router();

userRouter.post('/create',createUser);
userRouter.get('/get-user-details', getUserDetails);

export default userRouter;
