import express from 'express';
import { storeInfo } from '../controllers/store.controller.js';
import { storeGrade } from '../controllers/store.controller.js';

const storeRouter = express.Router();


storeRouter.get('/:store_id/info', storeInfo);
storeRouter.get('/:store_id/grade', storeGrade);

export default storeRouter;
