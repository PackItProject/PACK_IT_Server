import express from 'express';
import { storeInfo } from '../controllers/store.controller.js';

const storeRouter = express.Router();

console.log("store.route.js 실행");


// storeRouter.get('/:store_id/info', (req, res) => {
//     const store_id = req.params.store_id;
//     console.log(`/store/${store_id}/info 라우트에 도달함`);
//     storeInfo(store_id, res); // storeInfo 함수에 매개변수 전달
// });

storeRouter.get('/:store_id/info', storeInfo);

export default storeRouter;
