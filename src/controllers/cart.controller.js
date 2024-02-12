import {addItem as addCartItem, getOrderListDetailService} from '../services/cart.service.js';
import {getCartItems} from "../services/cart.service.js";
import {addOrderService} from "../services/cart.service.js";
import { getOrderListsService } from '../services/cart.service.js';
import {deleteOrderService} from '../services/cart.service.js'

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

export const addOrderController = async (req, res, next) => {
    const { pk_user, store_id, requirement, payment, pickup_time, status, menus, fee } = req.body;

    try {
        const result = await addOrderService(pk_user, store_id, requirement, payment, pickup_time, status, menus, fee);
        if (result.affectedRows > 0) {  // 쿼리가 성공적으로 실행되었다면,
            const orderId = result.insertId;  // 새로 추가된 주문의 ID를 얻습니다.
            res.json({
                message: "주문이 성공하였습니다.",
                orderId: orderId  // 주문 ID를 응답에 포함시킵니다.
            });
        } else {  // 쿼리가 실패하였다면,
            res.status(500).json({
                message: "주문이 실패하였습니다."
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

export const getOrderListsController = async (req, res) => {
    const { pk_user } = req.params;
    const orderLists = await getOrderListsService(pk_user);
    res.json(orderLists);
};

export const getOrderDetail = async (req, res, next) => {
    try {
        const orderId = req.params.order_id;
        const orderDetail = await getOrderListDetailService(orderId);
        res.status(200).json(orderDetail);
    } catch (err) {
        next(err);
    }
};

//주문삭제
export const deleteOrderController=async (req, res)=> {
    const { order_id } = req.params;
    try {
        const result = await deleteOrderService(order_id);
        if (result.affectedRows === 0) {
            res.status(404).send({ message: '주문이 존재하지 않습니다.' });
        } else {
            res.status(200).send({ message: '주문이 성공적으로 삭제되었습니다.' });
        }
    } catch (error) {
        res.status(500).send({ message: '서버 에러' });
    }
}

