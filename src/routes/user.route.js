import express from "express";
import { signInKakao } from "../controllers/user.controller.js";

const userRouter = express.Router();

console.log("카카오 로그인 테스트 1 - user.route.js 실행");

console.log("카카오 로그인 테스트 1");
userRouter.post('/kakao/signin', signInKakao);
console.log("카카오 로그인 테스트 2");

export default userRouter;


// 시도 2
// userRouter.post('/kakao/signin', async (req, res) => {
//     try {
//         console.log('들어온 값 : ', req.body);
//         const result = await signInKakao(req.body);
//         res.status(200).json(result);
//     } catch (error) {
//         console.error("에러 발생:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// export default userRouter;

// 시도 1
// console.log("카카오 로그인 테스트 1 - user.route.js 실행");

// userRouter.post('/kakao/signin', (req, res) => {
//     console.log('들어온 값 : ', req.body);
//     signInKakao(req.body, res);
// })

// export default userRouter;

// 기존 코드