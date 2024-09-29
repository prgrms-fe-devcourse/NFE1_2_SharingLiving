


const SocialKakao = () => {
    const Rest_api_key = 'b0e2b2652d275c68b292935198b128d7'; // REST API KEY
    const redirect_uri = 'http://localhost:5173/login'; // Redirect URI

    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };
        <button onClick={handleLogin}>카카오 로그인</button>
};

export default SocialKakao;