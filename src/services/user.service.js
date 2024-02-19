// import { getUserById, signUp } from "../services/user.dao.js";
// import axios from "axios";
// import jwt from "jsonwebtoken";
import { pool } from '../../config/db.config.js';

/* 기존 코드
export const getKakaoId = async (kakaoId, email, name, profileImage) => {

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

    if (!name || !email || !kakaoId || !profileImage) throw new Error("KEY_ERROR", 400);
    // 필수 정보가 누락됐을 경우 에러 발생

    const user = await getUserById(kakaoId);
    // 데이터베이스에서 사용자 조회

    if (user.length === 0) {
        await signUp(email, name, kakaoId, profileImage);
    }
    // 데이터베이스에 사용자가 존재하지 않을 경우 사용자 생성

    next
}; */

export const getUserById = async (kakaoId) => {
    const query = 'SELECT pk_user, email, name, profile FROM User WHERE pk_user=?';
    const params = [kakaoId]
    const rows = await pool.execute(query, params);

    return rows[0];
}; // kakaoId 값으로 특정 사용자 조회

export const signUp = async (kakaoId, email, name, profileImage) => {
    const params = [kakaoId, name, email, name, profileImage];
    // 카카오 로그인시 닉네임(카카오톡 닉네임)만 수집하기 때문에 name과 nickname 필드에 임의로 동일한 값을 넣는 방식으로 처리하였음
    const query = 'INSERT INTO User(pk_user, name, email, nickname, profile, payment, social_login, phone_number) VALUES (?, ?, ?, ?, ?, "임시", 1, "임시")';
    // const query = 'INSERT INTO User(kakaoId, name, email, name, profile, `임시`, 1, `임시`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const rows = await pool.execute(query, params);

    return rows[0];
}; // 데이터베이스에 등록되지 않은 사용자인 경우 등록