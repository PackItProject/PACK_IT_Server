//구글 맵 API 작성
const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const latitude = 37.7749; // 예시 위도
const longitude = -122.4194; // 예시 경도
const radius = 1000; // 검색 반경 (미터)

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}&type=restaurant`;

axios.get(url)
    .then(response => {
        const data = response.data;
        // 데이터 처리
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching nearby places:', error);
    });
