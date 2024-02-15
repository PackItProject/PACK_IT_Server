const path=require('path');
const express=require('express');
const orderRouter=express.Router();

const {getStoreListController,getStoreInfoController,postBookmarkController, getMenuController, showMealController,showSideController, searchByStoreNameController,getNearbyRestaurantListController}=require('../controllers/store.controller.js');
const bookmarkController=require('../controllers/bookmark.controller.js');
const {getBookmarkedStoreController} = require("../controllers/bookmark.controller.js");
const bookmarkRouter = require("./bookmark.route.js");

//지도에서 가게 접근
orderRouter.get('/order',getNearbyRestaurantListController);
orderRouter.get('/order/map/near',getStoreListController);
orderRouter.get('/order/map/near/:store_id',getStoreInfoController);

orderRouter.get('/order/map/near/:store_id/menu/:menu_id}',getMenuController);
orderRouter.get('/order/map/near/:store_id/meal',showMealController);
orderRouter.get('/order/map/near/:store_id/side',showSideController);
orderRouter.get('/order/map/search/:store_name', searchByStoreNameController);


//북마크에서 가게 접근
orderRouter.get('/order/bookmark/:store_id',getStoreInfoController);
orderRouter.get('/order/bookmark/:store_id/menu/:menu_id',getMenuController);
orderRouter.get('/order/bookmark/:store_id/meal',showMealController);
orderRouter.get('/order/bookmark/:store_id/side',showSideController);

