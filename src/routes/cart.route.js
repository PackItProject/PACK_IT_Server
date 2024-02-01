import express from "express";
import {addItem} from '../controllers/cart.controller.js';

const cartRouter=express.Router();

cartRouter.post('/',addItem);

export default cartRouter;
