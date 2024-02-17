import express from 'express';
import { storeInfo } from '../controllers/store.controller.js';
import { storeGrade } from '../controllers/store.controller.js';
import {getStoreListController,getByStoreIdController, getMenuController, showMealController, showSideController, searchByStoreNameController} from "../controllers/store.controller.js";

const storeRouter = express.Router();


storeRouter.get('/:store_id/info', storeInfo);
storeRouter.get('/:store_id/grade', storeGrade);


//지도에서 가게 접근
storeRouter.get('/near',getStoreListController);
storeRouter.get('/near/:store_id',getByStoreIdController);
storeRouter.get('/near/:store_id/menu/:menu_id',getMenuController);
storeRouter.get('/near/:store_id/meal',showMealController);
storeRouter.get('/near/:store_id/side',showSideController);
//storeRouter.get('/search/:store_name', searchByStoreNameController);

export default storeRouter;
