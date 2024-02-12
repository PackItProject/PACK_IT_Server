import express from "express";


import {getBookmarkedStoreController} from "../controllers/bookmark.controller.js";


const bookmarkRouter=express.Router();

bookmarkRouter.get('/:pk_user',getBookmarkedStoreController);

export default bookmarkRouter;