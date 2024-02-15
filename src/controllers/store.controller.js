import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import{ getStoreList} from "../services/store.service.js";
import{ getByStoreId} from "../services/store.service.js";
import {getByMenuId} from "../services/store.service.js";
import {getMeal} from "../services/store.service.js";
import {getSide} from "../services/store.service.js";
import {searchByStoreName} from "../services/store.service.js";
import { loadNearbyRestaurantsWithLoader } from '../services/map.service.js';

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
export const getByStoreIdController = async (req, res, next) => {
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

//menuId로 메뉴 조회
export const getMenuController=async(req,res,next)=>{
    const {storeId, menuId}=req.params;

    if(!storeId){
        console.log('잘못된 storeId입니다. ')
    }
    try{
        const menu=await getByMenuId(storeId,menuId);
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

export const searchByStoreNameController=async(req,res,next)=>{
    const {store_name}=req.params;
    try{
        const store=await searchByStoreName(store_name);
        res.json(store);
        next();
    }
    catch(error){
        console.error('Error finding side',error);
        next(error);
    }
};

export const getNearbyRestaurantListController=async(req,res,next)=>{

    loadNearbyRestaurantsWithLoader().then(() => {
        console.log("Nearby restaurants loaded successfully!");
    }).catch((error) => {
        console.error("Failed to load nearby restaurants:", error);
    });
}