import express from "express";
export const orderRouter=express.Router();

import {getStoreListController,getByStoreIdController, getMenuController, showMealController, showSideController, searchByStoreNameController} from "../controllers/store.controller.js";

//지도에서 가게 접근
orderRouter.get('/near',getStoreListController);
orderRouter.get('/near/:store_id',getByStoreIdController);
orderRouter.get('/near/:store_id/menu/:menu_id}',getMenuController);
orderRouter.get('/near/:store_id/meal',showMealController);
orderRouter.get('/near/:store_id/side',showSideController);
orderRouter.get('/search/:store_name', searchByStoreNameController);




