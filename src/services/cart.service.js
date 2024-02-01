// cart.service.js
import { pool } from '../../config/db.config.js';
//const Cart = require('../models/cart.dto.js');
//import Cart from '../models/cart.dto.js'
import { CartDTO } from '../models/cart.dto.js';

export const addItem = async (userId, storeId, menuId,quantity) => {
    const query = `INSERT INTO cart (pk_user, store_id, menu_id,quantity) VALUES (?, ?, ?,?)`;
    const params = [userId, storeId, menuId,quantity];
    const [rows, fields] = await pool.execute(query, params);  // 실제로 데이터베이스에 쿼리를 실행합니다.

    return rows;
};



