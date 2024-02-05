import express from "express";

const path=require('path');
const express=require('express');
const orderRouter=express.Router();

const mapController=require('../controllers/map.controller.js');
const bookmarkController=require('../controllers/bookmark.controller.js');

//지도에서 가게 접근
orderRouter.get('?orderType=map/near/',mapController.);
orderRouter.post('?orderType=map/near/bookmark');
orderRouter.get('?orderType=map/near/{store-id}');
orderRouter.post('r?orderType=map/near/{store-id}/bookmark');

orderRouter.get('?orderType=map/near/{store-id}/{menu-id}');
orderRouter.get('?orderType=map/near/{store-id}/meal');
orderRouter.get('?orderType=map/near/{store-id}/side');
orderRouter.get('?orderType=map/search/{store-id}');


//북마크에서 가게 접근
orderRouter.get('?orderType=bookmark/');
orderRouter.get('?orderType=bookmark/bookmarkId=1&storeId={store-id}');
orderRouter.get('?orderType=bookmark/bookmarkId=1&storeId={store-id}/{menu-id}');
orderRouter.get('?orderType=bookmark/bookmarkId=1&storeId={store-id}/meal');
orderRouter.get('?orderType=bookmark/bookmarkId=1&storeId={store-id}/side');

