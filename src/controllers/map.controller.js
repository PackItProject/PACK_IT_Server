const express=require('express');
const response=require('../../config/response.js');
const status=require('../../config/response.status.js');
const storeData=require('../models/storeData.dto.js');

exports.getStoreList=(req, res,next)=>{

}
exports.postBookmarkInList=(req,res, next)=>{
    //사용자가 별 누르면 북마크 됨.
    const orderType = req.query.orderType || 'map';
    const { storeId, bookmark } = req.body;

    const response = {
        storeId: storeId,
        bookmark: bookmark
    };

    res.json(response);
}
exports.getStoreIdInMap=(req,res,next)=>{
    const storeId=req.body.storeId;

    const store=storeData.findByStoreId(storeId);
    if(!storeId){
            //일치하는 ID 없다는 알림 화면.
    }else {
        const response = {
            pageTitle: 'showStore',
            message: 'findByStoreId'
        }
        res.render(ejs, response);
    }

}
