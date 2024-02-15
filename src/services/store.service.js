import { pool } from '../../config/db.config.js';

export const getStoreList=async() =>{

    const [rows]=await pool.execute(query);

    return rows;
}
export const getByStoreId = async (store_id) => {
    const query=`
        SELECT store.store_id, store.store_image, menu.type,menu.menu_id, menu.menu_name, menu.menu_image,menu.price, menu.size 
    FROM store 
    INNER JOIN menu on store.store_id=menu.store_id
    WHERE store.store_id=?
    `;
    const params = [store_id];
    const [rows] = await pool.execute(query, params);

    return rows;
}

//menuId로 메뉴 조회
export const getByMenuId=async(storeId, menuId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_id=? ';
    const params=[storeId, menuId];
    const [rows]=await pool.execute(query, params);

    return rows;
}

export const getMeal=async(storeId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_type=meal';
    const param=[storeId];
    const [rows]=await pool.execute(query, param);

    return rows;
}

export const getSide=async(storeId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_type=side';
    const param=[storeId];
    const [rows]=await pool.execute(query, param);

    return rows;
}

export const searchByStoreName=async(storeName)=>{
    const query='SELECT menu.* FROM menu WHERE storeName=?';
    const param=[storeName];
    const [rows]=await pool.execute(query, param);

    return rows;
}
