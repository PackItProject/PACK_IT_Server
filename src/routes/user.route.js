import express from "express";
import { signInKakao } from "../controllers/user.controller.js";

const userRouter = express.Router();

console.log("카카오 로그인 테스트 1");
userRouter.post('/kakao/signin', signInKakao);
console.log("카카오 로그인 테스트 2");

export default userRouter;
