import { pool } from '../../config/db.config.js';

export const getStoreInfo = async (store_id) => {
    const query = ' SELECT store.* FROM store WHERE store_id = ?';
    const params = [store_id];
    const rows = await pool.execute(query, params);

    return rows[0];
}