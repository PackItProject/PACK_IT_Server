//구글 맵 API 작성
//import { Loader } from "@googlemaps/js-api-loader";
import pkg from '@googlemaps/js-api-loader';
const { Loader } = pkg;

//API 로딩
const loader = new Loader({
    apiKey: "AIzaSyA9bzTkN3LjMZDDwLZRYMWVp4dfnQw_tjk",
    version: "weekly",
    ...additionalOptions,
});
//1.주변에 있는 식당 반환
// restaurants.js

// 사용자의 위치 반환
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject('Geolocation이 지원되지 않습니다.');
        }
    });
}

// 근처 식당 목록 표시
async function showNearbyRestaurants(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 근처 식당을 검색하는 요청 생성
    const request = {
        location: { lat: latitude, lng: longitude },
        radius: '500', // 미터 단위
        type: ['restaurant']
    };

    // placeservice 사용해서 근처 식당 목록 가져오기
    const service = new google.maps.places.PlacesService(document.createElement('map'));
    service.nearbySearch(request, processResults);
}

// 검색 결과 처리
function processResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // 결과를 처리하는 코드
        for (let i = 0; i < results.length; i++) {
            const place = results[i];
            // 각 식당에 대한 처리 (예: 이름, 위치 등을 가져와서 표시)
            console.log(place.name);
        }
    } else {
        console.error("Error fetching nearby restaurants:", status);
    }
}

export async function loadNearbyRestaurantsWithLoader() {
    await new Promise((resolve, reject) => {
        loader.load().then(async () => {
            try {
                const position = await getUserLocation();
                await showNearbyRestaurants(position);
                resolve();
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
}



    // //2.텍스트 쿼리로 장소찾기(검색)
    // function searchPlaces(text){
    //
    //     //텍스트 쿼리를 이요하여 장소를 찾는 요청 생성
    //     const request={
    //         query: text,
    //         fields: ['name', 'geometry','formatted_address'],
    //     };
    //
    //     const service=new google.maps.places.PlacesService(document.createElement('map'));
    //
    // //검색 결과 처리
    //     service.findPlaceFromQuery(request, function(results, status) {
    //         if (status === google.maps.places.PlacesServiceStatus.OK) {
    //             for (var i = 0; i < results.length; i++) {
    //                 createMarker(results[i]);
    //             }
    //             map.setCenter(results[0].geometry.location);
    //         }
    //     });
    // }
    //
    // });
