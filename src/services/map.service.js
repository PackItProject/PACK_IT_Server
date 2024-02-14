//구글 맵 API 작성
import { Loader } from "@googlemaps/js-api-loader"

//API 로딩
const loader = new Loader({
    apiKey: "YOUR_API_KEY",
    version: "weekly",
    ...additionalOptions,
});

loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

//1.주변 가게 목록 조회
//사용자의 위치 반환
    function getUserLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showNearbyRestaurants);
        }else{
            console.log('Geolocation이 지원되지 않습니다.')
        }
    }
//근처 식당 목록 표시
    function showNearbyRestaurants(position){
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;

    //근처 식당을 검색하는 요청 생성
        const request={
            location: {lat: latitude, lng: longitude},
            radius:'500',//미터단위
            type: ['restaurant']
        };

    //placeservice 사용해서 근처 식당 목록 가져오기
        const service=new google.maps.places.PlaceService(document.createElement('map'));
        service.nearbySearch(request, processResults);

    //검색 결과 처리
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
    }


    //2.텍스트 쿼리로 장소찾기(검색)
    function searchPlaces(text){

        //텍스트 쿼리를 이요하여 장소를 찾는 요청 생성
        const request={
            query: text,
            fields: ['name', 'geometry','formatted_address'],
        };

        const service=new google.maps.places.PlacesService(document.createElement('map'));

    //검색 결과 처리
        service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
            }
        });
    }

    });
