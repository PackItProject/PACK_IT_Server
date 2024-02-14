import { pool } from '../../config/db.config.js';

export const getStoreInfo = async (store_id) => {
    const query = ' SELECT store.* FROM store WHERE store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}

export const getStoreGrade = async (store_id) => {
    const query = ' SELECT u.name, g.grade, g.content, g.image FROM User u JOIN Grade g ON u.pk_user = g.pk_user WHERE g.store_id = ?'
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}