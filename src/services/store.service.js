import { pool } from '../../config/db.config.js';

export const getStoreInfo = async (store_id) => {
    const query = ' SELECT s.store_name, s.tel, s.address, s.boss, s.license, s.hours, s.introduction, s.notice FROM store s WHERE store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
};

export const getStoreGrade = async (store_id) => {
    const query = 'SELECT g.nickname, g.grade, g.content, g.image FROM Grade g JOIN store s ON g.store_id = s.store_id WHERE s.store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

};
export const getStoreList=async() =>{
    const query=`
        SELECT store.store_id, store.store_name,store.status, store.grade, store.address, store.image, Bookmark.*
        FROM store
        LEFT JOIN Bookmark on store.store_id=Bookmark.store_id;
        `;
    const [rows]=await pool.execute(query);

    return rows;
};
export const getByStoreId = async (store_id) => {
    const query=`
        SELECT store.store_id, store.image, menu.category,menu.id, menu.menu_name, menu.image,menu.price, menu.containter 
    FROM store 
    INNER JOIN menu on store.store_id=menu.store_id
    WHERE store.store_id=?
    `;
    const params = [store_id];
    const [rows] = await pool.execute(query, params);

    return rows;
};

//menuId로 메뉴 조회
export const getByMenuId=async(storeId, menuId)=>{
    const query='SELECT menu.* FROM menu WHERE store_id=? AND menu_id=? ';
    const params=[storeId, menuId];
    const [rows]=await pool.execute(query, params);

    return rows;
};

export const getMeal=async(storeId)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image
        FROM menu 
        WHERE store_id=? AND menu_category=1`;
    const param=[storeId];
    const [rows]=await pool.execute(query, param);

    return rows;
};

export const getSide=async(storeId)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image
        FROM menu 
        WHERE store_id=? AND menu_category=0`;    const param=[storeId];
    const [rows]=await pool.execute(query, param);

    return rows;
};

export const searchByStoreName=async(storeName)=>{
    const query='SELECT menu.* FROM menu WHERE store_name=?';
    const param=[storeName];
    const [rows]=await pool.execute(query, param);

    return rows;
};
