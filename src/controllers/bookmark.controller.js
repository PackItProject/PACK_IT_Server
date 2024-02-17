import {getBookmarkedStoreService, postBookmarkService, getBookmarkedStoreList, getBookmarkedByStoreId,getBookmarkedByMenuId, getBookmarkedMeal, getBookmarkedSide
} from "../services/bookmark.service.js";
import {getByMenuId, getByStoreId, getMeal, getSide} from "../services/store.service.js";

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

export const getBookmarkedStoreListController = async (req, res, next) => {
    const { pk_user } = req.params;
    try {
        const stores = await getBookmarkedStoreList(pk_user);
        res.json(stores);
    } catch (error) {
        next(error);
    }
};

export const getBookmarkedByStoreIdController = async (req, res, next) => {
    const { store_id,pk_user } = req.params;
    console.log("store id is ", store_id);

    if (!store_id) {
        return res.status(400).json({ error : "잘못된 가게 정보입니다" });
    }

    try {
        const aboutStore = await getBookmarkedByStoreId(store_id,pk_user);
        res.json(aboutStore);
    } catch(error) {
        console.error(error);
        next (error);
    }
};

//menuId로 메뉴 조회
export const getBookmarkedMenuIdController=async(req,res,next)=>{

    try {
        const {store_id, menu_id, pk_user} = req.params;

        if (!store_id) {
            console.log('잘못된 storeId입니다. ');
            return res.status(400).json({error: "잘못된 가게 정보입니다"});
        }
        if(!menu_id){
            console.log('잘못된 pk_user입니다.');
            return res.status(400).json({ error : "잘못된 유저 정보입니다" });
        }
        if(!pk_user){
            console.log('잘못된 pk_user입니다.');
            return res.status(400).json({ error : "잘못된 유저 정보입니다" });
        }

        const menu = await getBookmarkedByMenuId(store_id, menu_id, pk_user);
        if(!menu || menu.length===0){
            console.log('북마크된 가게의 메뉴가 없습니다.');
            return res.status(404).json({ error : "북마크된 가게의 메뉴가 없습니다." })
        }
        res.json(menu);
    }
    catch(error){
        console.error('Error finding menu',error);
        next(error);
    }
};

//meal 조회
export const showBookmarkedMealController=async(req,res,next)=>{


    try{
        const {store_id, pk_user}=req.params;

        if(!store_id){
        console.log('잘못된 storeId입니다.');
        return res.status(400).json({ error : "잘못된 가게 정보입니다" });
        }
        if(!pk_user){
            console.log('잘못된 pk_user입니다.');
            return res.status(400).json({ error : "잘못된 유저 정보입니다" });
        }

        const meal=await getBookmarkedMeal(store_id,pk_user);
        if(!meal || meal.length===0){
            console.log('북마크된 가게의 메인 메뉴가 없습니다.');
            return res.status(404).json({ error : "북마크된 가게의 메인 메뉴가 없습니다." })
        }
        res.json(meal);
        next();
    }
    catch(error){
        console.error('Error finding meal',error);
        next(error);
    }
};

//side 조회
export const showBookmarkedSideController=async(req,res,next)=>{
    try{
        const {store_id,pk_user}=req.params;
        if(!store_id){
            console.log('잘못된 storeId입니다.');
            return res.status(400).json({ error : "잘못된 가게 정보입니다" });
        }
        if(!pk_user){
            console.log('잘못된 pk_user입니다.');
            return res.status(400).json({ error : "잘못된 유저 정보입니다" });
        }

        const side=await getBookmarkedSide(store_id,pk_user);
        if(!side || side.length===0){
            console.log('북마크된 가게의 사이드 메뉴가 없습니다.');
            return res.status(404).json({ error : "북마크된 가게의 사이드 메뉴가 없습니다." })
        }
        res.json(side);
        next();
    }
    catch(error){
        console.error('Error finding side',error);
        next(error);
    }
};



