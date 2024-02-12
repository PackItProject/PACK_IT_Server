import {getBookmarkedStoreService} from "../services/bookmark.service.js";

//북마크된 가게 조회
export const getBookmarkedStoreController = async (req, res, next) => {
    const { pk_user } = req.params;
    try {
        const stores = await getBookmarkedStoreService(pk_user);
        res.json(stores);
    } catch (error) {
        next(error);
    }
};

