import express from "express";


import {getBookmarkedStoreController, postBookmarkController,getBookmarkedByStoreIdController, getBookmarkedMenuIdController, showBookmarkedMealController, showBookmarkedSideController
} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('/bookmark/:pk_user',getBookmarkedStoreController);
bookmarkRouter.post('/bookmark/:store_id/:pk_user',postBookmarkController);


//북마크에서 가게 접근
bookmarkRouter.get('/order/bookmark/:pk_user/:store_id',getBookmarkedByStoreIdController);
bookmarkRouter.get('/order/bookmark/:pk_user/:store_id/menu/:menu_id',getBookmarkedMenuIdController);
bookmarkRouter.get('/order/bookmark/:pk_user/:store_id/meal',showBookmarkedMealController);
bookmarkRouter.get('/order/bookmark/:pk_user/:store_id/side',showBookmarkedSideController);

export default bookmarkRouter;