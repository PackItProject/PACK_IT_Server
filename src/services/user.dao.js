import { pool } from '../../config/db.config.js';

const getUserById = async (kakaoId) => {
    const query = 'SELECT pk_user, email, name, profile FROM User WHERE pk_user=?';
    const params = [kakaoId]
    const rows = await pool.execute(query, params);

    return rows[0];
}; // kakaoId 값으로 특정 사용자 조회

const signUp = async (email, name, kakaoId, profileImage) => {
    const params = [kakaoId, name, email, name, profileImage];
    // 카카오 로그인시 닉네임(카카오톡 닉네임)만 수집하기 때문에 name과 nickname 필드에 임의로 동일한 값을 넣는 방식으로 처리하였음
    const query = 'INSERT INTO User(pk_user, name, email, nickname, profile, payment, social_login, phone_number) VALUES (?, ?, ?, ?, ?, "임시", 1, "임시")';
    // const query = 'INSERT INTO User(kakaoId, name, email, name, profile, `임시`, 1, `임시`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const rows = await pool.execute(query, params);

    return rows[0];
}; // 데이터베이스에 등록되지 않은 사용자인 경우 등록

export { getUserById, signUp };
