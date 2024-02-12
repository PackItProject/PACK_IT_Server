const storeData=require('../models/storeData.dto.js');
export const storeListResponseDTO=()=>{
    success: true;
        message: "주변 가게 목록 조회 성공";
        stores: storesData;
}