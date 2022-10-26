import express from 'express'
import {createUser} from '../controllers/authenticationController.js'

var userRouter = express.Router();

userRouter.post('/create',createUser);

export default userRouter;
