import { status } from '../../config/response.status.js';
import { getStoreInfo } from '../services/store.service.js';
import { getStoreGrade } from '../services/store.service.js';
import { response } from '../../config/response.js';
import{ getStoreList} from "../services/store.service.js";
import{ getByStoreId} from "../services/store.service.js";
import {getByMenuId} from "../services/store.service.js";
import {getMeal} from "../services/store.service.js";
import {getSide} from "../services/store.service.js";
import {searchByStoreName} from "../services/store.service.js";

export const getStoreListController=async(req,res,next)=>{
    try{
        const storeList=await getStoreList();
        res.json(storeList);
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
    } catch(error) {
        console.error(error);
        next (error);
    }
};

//menuId로 메뉴 조회
export const getMenuController = async(req, res, next)=>{
    try {
        const { store_id, menu_id } = req.params;

        if(!store_id){
            console.log('잘못된 storeId입니다. ');
            return res.status(400).json({ error : "잘못된 가게 정보입니다" });
        }

        const menu=await getByMenuId(store_id,menu_id);
        res.json(menu);

    }catch(error){
        console.error(error);
    }
};

//meal 조회
export const showMealController = async(req,res,next)=>{
    try {
        const { store_id } = req.params;

        if (!store_id) {
            console.log('잘못된 storeId입니다.');
            return res.status(400).json({error: "잘못된 가게 정보입니다"});
        }
        const meal=await getMeal(store_id);
        if (!meal || meal.length === 0) {
            console.log('해당 가게에 대한 음식이 없습니다.');
            return res.status(404).json({ error: "해당 가게에 대한 식사류가 없습니다." });
        }
        res.json(meal);
        next();
    }catch(error){
        console.error(error);
    }
};

//side 조회
export const showSideController=async(req,res,next)=>{
    try {
        const {store_id} = req.params;

         if (!store_id) {
             console.log('잘못된 storeId입니다.'+ store_id);
             return res.status(400).json({error: "잘못된 가게 정보입니다"});
         }
        const side = await getSide(store_id);
         if(!side || side.length===0){
             console.log('해당 가게에는 사이드메뉴가 없습니다.');
             return res.status(404).json({ error: "해당 가게에 대한 사이드메뉴가 없습니다." });
         }
        res.json(side);
         next();
    }
    catch(error){
        console.error(error);
        next(error);
    }
};

export const searchByStoreNameController=async(req,res,next)=>{
    const {store_name}=req.params;
    try{
        const store=await searchByStoreName(store_name);
        res.json(store);
    }
    catch(error){
        console.error('Error finding side',error);
        next(error);
    }
};



export const storeInfo = async (req, res, next) => {
    const { store_id } = req.params;
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
export const storeGrade = async (req, res, next) => {
    const { store_id } = req.params;
    console.log("store id is ", store_id);

    if (!store_id) {
        return res.status(400).json({ error : "잘못된 가게 정보입니다" });
    }

    try {
        const aboutStore = await getStoreGrade(store_id);
        res.json(aboutStore);
        next();
    } catch(error) {
        console.error(error);
        next (error);
    }
};
