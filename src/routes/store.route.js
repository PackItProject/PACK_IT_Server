import express from 'express';
import { storeInfo } from '../controllers/store.controller.js';

const storeRouter = express.Router();


storeRouter.get('/:store_id/info', storeInfo);

export default storeRouter;
