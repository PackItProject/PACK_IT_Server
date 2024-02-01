import { addItem as addCartItem } from '../services/cart.service.js';

export const addItem = async (req, res, next) => {
    const { userId, storeId, menuId, quantity } = req.body;
    try {
        const addedItem = await addCartItem(userId, storeId, menuId, quantity);
        res.json({
            item: addedItem,
            message: "장바구니에 담겼습니다."
        });
    } catch (error) {
        next(error);
    }
};