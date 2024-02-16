import { pool } from '../../config/db.config.js';

export const getStoreInfo = async (store_id) => {
    const query = ' SELECT s.store_name, s.tel, s.address, s.boss, s.license, s.hours, s.introduction, s.notice FROM store s WHERE store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}

export const getStoreGrade = async (store_id) => {
    const query = 'SELECT g.nickname, g.grade, g.content, g.image FROM Grade g JOIN store s ON g.store_id = s.store_id WHERE s.store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}