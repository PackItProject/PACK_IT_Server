import { pool } from '../../config/db.config.js';

const getUserById = async (kakaoId) => {
    const query = 'SELECT pk_user, email, name, profile FROM users WHERE kakao_id=?';
    const params = [kakaoId]
    const rows = await pool.execute(query, params);

    return rows[0];
}; // kakaoId 값으로 특정 사용자 조회

const signUp = async (email, name, kakaoId, profileImage) => {
    const query = 'INSERT INTO users(pk_user, name, email, name, profile, "임시", 0, "임시") VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    const params = [email, name, kakaoId, profileImage];
    const rows = await pool.execute(query, params);

    return rows[0];
}; // 데이터베이스에 등록되지 않은 사용자인 경우 등록

export { getUserById, signUp };
