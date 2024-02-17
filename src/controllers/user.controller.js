import { getKakaoId } from '../services/user.service.js';

const signInKakao = async (req, res) => {
    const headers = req.headers["authorization"];
    const kakaoToken = headers.split(" ")[1];
    // kakaoToken 변수에 액세스 토큰값 저장
    // const kakaoToken = "임시 토큰 발급 받아서 수정하고 테스트";
    
    const accessToken = await getKakaoId(kakaoToken);

    return res.status(200).json({ accessToken });
};

export { signInKakao };