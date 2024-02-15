import express from "express";
export const orderRouter=express.Router();

import {getStoreListController,getByStoreIdController, getMenuController, showMealController, showSideController, searchByStoreNameController,getNearbyRestaurantListController
} from "../controllers/store.controller.js";

//지도에서 가게 접근
orderRouter.get('/order/map',getNearbyRestaurantListController);
orderRouter.get('/order/map/near',getStoreListController);
orderRouter.get('/order/map/near/:store_id',getByStoreIdController);

orderRouter.get('/order/map/near/:store_id/menu/:menu_id}',getMenuController);
orderRouter.get('/order/map/near/:store_id/meal',showMealController);
orderRouter.get('/order/map/near/:store_id/side',showSideController);
orderRouter.get('/order/map/search/:store_name', searchByStoreNameController);


//북마크에서 가게 접근
orderRouter.get('/order/bookmark/:store_id',getByStoreIdController);
orderRouter.get('/order/bookmark/:store_id/menu/:menu_id',getMenuController);
orderRouter.get('/order/bookmark/:store_id/meal',showMealController);
orderRouter.get('/order/bookmark/:store_id/side',showSideController);

