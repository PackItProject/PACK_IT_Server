import { status } from '../../config/response.status.js';
import { getStoreData } from '../services/store.service.js';
import { response } from '../../config/response.js';

export const storeInfo = async (req, res) => {
    console.log("store.controller.js 실행");
    const { store_id } = req.params;
    const storeInfomation = await getStoreData(store_id);
    console.log("storeId is", storeId);

    res.send(storeInfomation);
};