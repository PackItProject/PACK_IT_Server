import {pool} from "../../config/db.config.js";

export const getBookmarkedStoreService = async (pk_user) => {
    const query = `
        SELECT store.store_name, store.status, AVG(G.grade) as average_grade, store.address,store.bookmark
        FROM store
        INNER JOIN PackIt.Grade G on store.store_id = G.store_id
        INNER JOIN PackIt.Bookmark on store.store_id = Bookmark.store_id
        WHERE store.bookmark=1 and Bookmark.pk_user=?
        GROUP BY store.store_name, store.status, store.address
    `;

    const [result] = await pool.execute(query,[pk_user]);
    return result;
};
