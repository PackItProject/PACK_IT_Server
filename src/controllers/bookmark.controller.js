import {getBookmarkedStoreService, postBookmarkService} from "../services/bookmark.service.js";

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

//북마크 설정
export const postBookmarkController = async (req, res, next) => {
    const { store_id, pk_user } = req.params;
    try {
        await postBookmarkService(store_id, pk_user);
        res.status(200).send({ message: '북마크가 성공적으로 변경되었습니다.' });
    } catch (error) {
        next(error);
    }
};



