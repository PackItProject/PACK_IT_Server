import { addItem as addCartItem } from '../services/cart.service.js';
import {getCartItems} from "../services/cart.service.js";

export const addItem = async (req, res, next) => {
    const { userId, storeId, menuId, quantity } = req.body;
    try {
        const result = await addCartItem(userId, storeId, menuId, quantity);
        if (result.affectedRows > 0) {  // 쿼리가 성공적으로 실행되었다면,
            res.json({
                message: "장바구니에 담겼습니다."
            });
        } else {  // 쿼리가 실패하였다면,
            res.status(500).json({
                message: "장바구니에 담는데 실패하였습니다."
            });
        }
    } catch (error) {
        next(error);
    }
};


export const listCartItems = async (req, res, next) => {
    const { pk_user, store_id } = req.query;

    // Ensure pk_user and store_id are provided
    if (!pk_user || !store_id) {
        return res.status(400).json({ error: "pk_user and store_id are required" });
    }

    try {
        const cartItems = await getCartItems(pk_user, store_id);
        res.json(cartItems);
    } catch (error) {
        next(error);
    }
};


