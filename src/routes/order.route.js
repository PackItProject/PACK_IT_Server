const path=require('path');
const express=require('express');
const orderRouter=express.Router();

const {getStoreListController,getStoreInfoController,postBookmarkController, getMenuController, showMealController,showSideController, searchByStoreNameController}=require('../controllers/store.controller.js);
const bookmarkController=require('../controllers/bookmark.controller.js');
const {getMeal} = require("../controllers/map.controller.js");

//지도에서 가게 접근
orderRouter.get('?orderType=map/near/',getStoreListController);
orderRouter.post('?orderType=map/near/bookmark',postBookmarkController);
orderRouter.get('?orderType=map/near/:store_id',getStoreInfoController);
orderRouter.post('r?orderType=map/near/:store_id/bookmark',postBookmarkController);

orderRouter.get('?orderType=map/near/:store_id/:menu_id}',getMenuController);
orderRouter.get('?orderType=map/near/:store_id/meal',showMealController);
orderRouter.get('?orderType=map/near/:store_id/side',showSideController);
orderRouter.get('?orderType=map/search/:store_name', searchByStoreNameController);


//북마크에서 가게 접근
orderRouter.get('?orderType=bookmark/:store_id',getStoreInfoController);
orderRouter.get('?orderType=bookmark/:store_id/:menu-id',getMenuController);
orderRouter.get('?orderType=bookmark/:store_id/meal',showMealController);
orderRouter.get('?orderType=bookmark/:store_id/side',showSideController);

