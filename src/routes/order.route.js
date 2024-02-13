const path=require('path');
const express=require('express');
const orderRouter=express.Router();

const {getStoreListController,getStoreInfoController,postBookmarkController, getMenuController, showMealController,showSideController}=require('../controllers/store.controller.js);
const bookmarkController=require('../controllers/bookmark.controller.js');
const {getMeal} = require("../controllers/map.controller.js");

//지도에서 가게 접근
orderRouter.get('?orderType=map/near/',getStoreListController);
orderRouter.post('?orderType=map/near/bookmark',postBookmarkController);
orderRouter.get('?orderType=map/near/:store_id',getStoreInfoController);
orderRouter.post('r?orderType=map/near/:store_id/bookmark',postBookmarkController);

orderRouter.get('?orderType=map/near/:store_id/:menu_id}',getMenuController);
orderRouter.get('?orderType=map/near/:store-id/meal',showMealController);
orderRouter.get('?orderType=map/near/:store-id/side',showSideController);
orderRouter.get('?orderType=map/search/:store-id');


//북마크에서 가게 접근
orderRouter.get('?orderType=bookmark/');
orderRouter.get('?orderType=bookmark/:bookmarkId&:store-id');
orderRouter.get('?orderType=bookmark/:bookmarkId=1&:store-id/:menu-id');
orderRouter.get('?orderType=bookmark/:bookmarkId=1&:store-id/meal');
orderRouter.get('?orderType=bookmark/:bookmarkId=1&:store-id/side');

