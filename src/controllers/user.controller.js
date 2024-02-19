import { getUserById, signUp } from '../services/user.service.js';

export const signInKakao = async (req, res) => {
    const { kakaoId, email, name, profileImage } = req.body;
    
    if (!name) throw new Error("이름 정보 누락", 400);
    if (!email) throw new Error("이메일 정보 누락", 400);
    if (!kakaoId) throw new Error("카카오 아이디 정보 누락", 400);
    if (!profileImage) throw new Error("프로필 이미지 정보 누락", 400);
    // 필수 정보가 누락됐을 경우 에러 발생

    try {
        const user = await getUserById(kakaoId);
        // 데이터베이스에서 사용자 조회
    
        if (user.length === 0) {
            await signUp(kakaoId, email, name, profileImage);
        } // 데이터베이스에 사용자가 존재하지 않을 경우 사용자 생성 (회원가입)
        else {
            await getUserById(kakaoId);
        } // 기존에 있던 회원일 경우

        res.status(200).send({ message: '로그인 성공' });
    } catch(error) {
        console.error(error);
        next (error);
    }
};