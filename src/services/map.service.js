// //구글 맵 API 작성
// const axios = require('axios');
//
// const apiKey = 'YOUR_API_KEY';
// const latitude = 37.7749; // 예시 위도
// const longitude = -122.4194; // 예시 경도
// const radius = 1000; // 검색 반경 (미터)
//
// const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}&type=restaurant`;
//
// axios.get(url)
//     .then(response => {
//         const data = response.data;
//         // 데이터 처리
//         console.log(data);
//     })
//     .catch(error => {
//         console.error('Error fetching nearby places:', error);
//     });
//구글 설명 따라서
<script>
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyA9bzTkN3LjMZDDwLZRYMWVp4dfnQw_tjkE",
    // Add other bootstrap parameters as needed, using camel case.
    // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
});
</script>

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

