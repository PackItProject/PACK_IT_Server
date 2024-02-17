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
        SELECT store.store_id, store.image, menu.menu_category,menu.id, menu.menu_name, menu.image,menu.price, menu.containter 
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
    const query='SELECT menu.* FROM menu WHERE store_id=? AND id=? ';
    const params=[storeId, menuId];

    const [rows]=await pool.execute(query, params);

    return rows;
};

export const getMeal=async(store_id)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image
        FROM menu 
        WHERE store_id=? AND menu_category=1`;
    const params=[store_id];

    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    }catch(error) {
        console.error("음식을 가져오는 중 오류 발생:", error);
        throw error; // 호출자에게 에러를 전파합니다.
    }
};

export const getSide=async(storeId)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image
        FROM menu 
        WHERE store_id=? AND menu_category=0`;
    const params=[storeId];
    const [rows]=await pool.execute(query, params);

    return rows;
};

export const searchByStoreName=async(storeName)=>{
    const query='SELECT menu.*, store.store_name\n' +
        'FROM menu\n' +
        'INNER JOIN store ON store.store_id=menu.store_id\n' +
        'WHERE store.store_name=\'초식곳간\';';
    const params=[storeName];
    const [rows]=await pool.execute(query, params);

    return rows;
};
