import express from "express";


import {getBookmarkedStoreController, postBookmarkController,getBookmarkedByStoreIdController, getBookmarkedMenuIdController, showBookmarkedMealController, showBookmarkedSideController
} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('/:pk_user',getBookmarkedStoreController);
bookmarkRouter.post('/:store_id/:pk_user',postBookmarkController);


//북마크에서 가게 접근
bookmarkRouter.get('/:pk_user/store/:store_id',getBookmarkedByStoreIdController);
bookmarkRouter.get('/:pk_user/store/:store_id/menu/:menu_id',getBookmarkedMenuIdController);
bookmarkRouter.get('/:pk_user/store/:store_id/meal',showBookmarkedMealController);
bookmarkRouter.get('/:pk_user/store/:store_id/side',showBookmarkedSideController);

export default bookmarkRouter;