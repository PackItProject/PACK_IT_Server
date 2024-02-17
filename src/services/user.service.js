import { getUserById, signUp } from "../services/user.dao.js";
import axios from "axios";
import jwt from "jsonwebtoken";
const getKakaoId = async (kakaoToken) => {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    }); // 카카오 API에 인증 요청을 보내 사용자 정보를 가져옴

    const { data } = result;
    // const { nickname: name, kakao_account: { email }, id: kakaoId, properties: { profile_image: profileImage } } = data;

    const name = data.properties.nickname;
    const email = data.kakao_account.email;
    const kakaoId = data.id;
    const profileImage = data.properties.profile_image;
    if (!name || !email || !kakaoId) throw new Error("KEY_ERROR", 400);
    // 필수 정보가 누락됐을 경우 에러 발생

    const user = await getUserById(kakaoId);
    // 데이터베이스에서 사용자 조회

    if (user.length === 0) {
        await signUp(email, name, kakaoId, profileImage);
    }
    // 데이터베이스에 사용자가 존재하지 않을 경우 사용자 생성

    console.log("user 값은 : ", user);
    return jwt.sign({ kakaoId: user[0].pk_user }, process.env.JWT_SECRET);
};

export { getKakaoId };