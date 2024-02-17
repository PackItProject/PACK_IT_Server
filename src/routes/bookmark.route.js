import express from "express";


import {getBookmarkedStoreController, postBookmarkController} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('/:pk_user',getBookmarkedStoreController);
bookmarkRouter.post('/:store_id/:pk_user',postBookmarkController)

export default bookmarkRouter;