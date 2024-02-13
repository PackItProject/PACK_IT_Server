import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import {getBookmarkedStoreService, postBookmarkService} from "../services/bookmark.service.js";
import{ getStoreList} from "../services/store.service.js";
import{ getByStoreId} from "../services/store.service.js";
import {getByMenuId} from "../services/store.service.js";
import {getMeal} from "../services/store.service.js";
import {getSide} from "../services/store.service.js";

export const getStoreListController=async(req,res,next)=>{
    try{
        const storeList=getStoreList();
        res.json(storeList);
        next();
    }
    catch(error){
        console.error(error);
        next (error);
    }
}
export const getStoreInfoController = async (req, res, next) => {
    const { store_id } = req.params;
    console.log("store id is ", store_id);

    if (!store_id) {
        return res.status(400).json({ error : "잘못된 가게 정보입니다" });
    }

    try {
        const aboutStore = await getByStoreId(store_id);
        res.json(aboutStore);
        next();
    } catch(error) {
        console.error(error);
        next (error);
    }
};

//북마크 생성
export const postBookmarkController=async(req,res,next)=>{
    const { store_id, pk_user } = req.params;
    try {
        await postBookmarkService(store_id, pk_user);
        res.status(200).send({ message: '북마크가 성공적으로 변경되었습니다.' });
    } catch (error) {
        next(error);
    }
};

//menuId로 메뉴 조회
export const getMenuController=async(req,res,next)=>{
    const storeId=req.params;

    if(!storeId){
        console.log('잘못된 storeId입니다. ')
    }
    try{
        const menu=await getMenu(storeId);
        res.json(menu);
        next();
    }
    catch(error){
        console.error('Error finding menu',error);
        next(error);
    }
};

//meal 조회
export const showMealController=async(req,res,next)=>{
    const {storeId}=req.params;
    if(!storeId){
        console.log('잘못된 storeId입니다.')
    }
    try{
        const meal=getMeal(storeId);
        res.json(meal);
        next();
    }
    catch(error){
        console.error('Error finding meal',error);
        next(error);
    }
};

//side 조회
export const showSideController=async(req,res,next)=>{
    const {storeId}=req.params;
    if(!storeId){
        console.log('잘못된 storeId입니다.')
    }
    try{
        const side=getSide(storeId);
        res.json(side);
        next();
    }
    catch(error){
        console.error('Error finding side',error);
        next(error);
    }
};