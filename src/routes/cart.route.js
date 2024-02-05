import express from "express";
import {addItem} from '../controllers/cart.controller.js';
import {listCartItems} from "../controllers/cart.controller.js";
import {addOrderController} from "../controllers/cart.controller.js";

const cartRouter=express.Router();

cartRouter.post('/',addItem);
cartRouter.get('/',listCartItems);
cartRouter.post('/order',addOrderController);

export default cartRouter;

