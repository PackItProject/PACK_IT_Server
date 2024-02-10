import express from 'express';
import { storeInfo } from '../controllers/store.controller.js';

const storeRouter = express.Router();

console.log("store.route.js 실행");

storeRouter.get('/:store_id/info', storeInfo);

export default storeRouter;
