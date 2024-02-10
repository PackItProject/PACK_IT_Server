import { status } from '../../config/response.status.js';
import { getStoreInfo } from '../services/store.service.js';
import { response } from '../../config/response.js';

export const storeInfo = async (req, res, next) => {
    console.log("storeInfo 실행됨");
    console.log("req.params is ", req.params);
    const { store_id } = req.params;
    console.log("여기로 넘어옴");
    console.log("store id is ", store_id);

    if (!store_id) {
        return res.status(400).json({ error : "잘못된 가게 정보입니다" });
    }

    try {
        const aboutStore = await getStoreInfo(store_id);
        res.json(aboutStore);
        next();
    } catch(error) {
        console.error(error);
        next (error);
    }
};