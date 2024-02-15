import express from "express";


import {getBookmarkedStoreController, postBookmarkController} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('/bookmark/:pk_user',getBookmarkedStoreController);
bookmarkRouter.post('/bookmark/:store_id/:pk_user',postBookmarkController);

export default bookmarkRouter;