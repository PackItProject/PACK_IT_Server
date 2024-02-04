// cart.service.js
import { pool } from '../../config/db.config.js';
//const Cart = require('../models/cart.dto.js');
//import Cart from '../models/cart.dto.js'
import { CartDTO } from '../models/cart.dto.js';

export const addItem = async (userId, storeId, menuId, quantity) => {
    // 먼저 해당 항목이 이미 있는지 확인합니다.
    const checkQuery = `SELECT * FROM cart WHERE pk_user = ? AND store_id = ? AND menu_id = ?`;
    const checkParams = [userId, storeId, menuId];
    const [checkRows, fields] = await pool.execute(checkQuery, checkParams);

    if (checkRows.length > 0) {  // 이미 해당 항목이 있다면,
        // 수량을 업데이트합니다.
        const updateQuery = `UPDATE cart SET quantity = quantity + ? WHERE pk_user = ? AND store_id = ? AND menu_id = ?`;
        const updateParams = [quantity, userId, storeId, menuId];
        const [updateRows, fields] = await pool.execute(updateQuery, updateParams);

        return updateRows;
    } else {  // 해당 항목이 없다면,
        // 새 항목을 추가합니다.
        const insertQuery = `INSERT INTO cart (pk_user, store_id, menu_id, quantity) VALUES (?, ?, ?, ?)`;
        const insertParams = [userId, storeId, menuId, quantity];
        const [insertRows, fields] = await pool.execute(insertQuery, insertParams);

        return insertRows;
    }
};


export const getCartItems = async (pk_user, store_id) => {
    const query = `
        SELECT cart.*, User.name,User.phone_number,menu.menu_name, menu.price, store.store_name, store.address,store.notice
        FROM cart
        INNER JOIN User ON cart.pk_user=cart.pk_user
        INNER JOIN menu ON cart.menu_id = menu.id
        INNER JOIN store ON cart.store_id = store.id
        WHERE cart.pk_user = ? AND cart.store_id = ?`;
    const params = [pk_user, store_id];
    const [rows, fields] = await pool.execute(query, params);

    return rows;
};





