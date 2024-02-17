import express from "express";
import { signInKakao } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/kakao/signin', signInKakao);

export default userRouter;