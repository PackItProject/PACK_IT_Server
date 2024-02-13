import express from "express";


import {getBookmarkedStoreController, postBookmarkController} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('?orderType=bookmark/:pk_user',getBookmarkedStoreController);
bookmarkRouter.post('?orderType=bookmark/:store_id/:pk_user',postBookmarkController)

export default bookmarkRouter;