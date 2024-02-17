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
    const {storeId, menuId, pk_user}=req.params;

    if(!storeId){
        console.log('잘못된 storeId입니다. ')
    }
    try{
        const menu=await getBookmarkedByMenuId(storeId,menuId,pk_user);
        res.json(menu);
    }
    catch(error){
        console.error('Error finding menu',error);
        next(error);
    }
};

//meal 조회
export const showBookmarkedMealController=async(req,res,next)=>{
    const {storeId, pk_user}=req.params;
    if(!storeId){
        console.log('잘못된 storeId입니다.')
    }
    try{
        const meal=await getBookmarkedMeal(storeId,pk_user);
        res.json(meal);
    }
    catch(error){
        console.error('Error finding meal',error);
        next(error);
    }
};

//side 조회
export const showBookmarkedSideController=async(req,res,next)=>{
    const {storeId,pk_user}=req.params;
    if(!storeId){
        console.log('잘못된 storeId입니다.')
    }
    try{
        const side=await getBookmarkedSide(storeId,pk_user);
        res.json(side);
    }
    catch(error){
        console.error('Error finding side',error);
        next(error);
    }
};



