import express from "express";
import {addItem, deleteOrderController, getOrderDetail,deleteCartController} from '../controllers/cart.controller.js';
import {listCartItems} from "../controllers/cart.controller.js";
import {addOrderController} from "../controllers/cart.controller.js";
import {getOrderListsController} from "../controllers/cart.controller.js";


const cartRouter=express.Router();

cartRouter.post('/',addItem);
cartRouter.get('/',listCartItems);
cartRouter.delete('/',deleteCartController);
cartRouter.post('/order',addOrderController);
cartRouter.get('/order/:pk_user',getOrderListsController);
cartRouter.get('/orderdetail/:order_id',getOrderDetail);
cartRouter.delete('/order/:order_id', deleteOrderController);


export default cartRouter;

