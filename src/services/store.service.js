import { pool } from '../../config/db.config.js';

export const getStoreList=async() =>{
    const query='SELECT store.* FROM store';
    const rows=await pool.execute(query);

    return rows;
}
export const getByStoreId = async (store_id) => {
    const query = ' SELECT store.* FROM store WHERE store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}

//menuId로 메뉴 조회
export const getByMenuId=async(storeId, menuId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_id=? ';
    const params=[storeId, menuId];
    const rows=await pool.execute(query, params);

    return rows[0];
}

export const getMeal=async(storeId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_type=meal';
    const param=[storeId];
    const rows=await pool.execute(query, param);

    return rows[0];
}

export const getSide=async(storeId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_type=side';
    const param=[storeId];
    const rows=await pool.execute(query, param);

    return rows[0];
}

export const searchByStoreName=async(storeName)=>{
    const query='SELECT menu.* FROM menu WHERE storeName=?';
    const param=[storeName];
    const rows=await pool.execute(query, param);

    return rows[0];
}
