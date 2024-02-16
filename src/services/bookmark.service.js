import {pool} from "../../config/db.config.js";

export const getBookmarkedStoreService = async (pk_user) => {
    const query = `
        SELECT store.store_id, store.store_name, store.status, AVG(G.grade) as average_grade,
               store.address, store.image,
               CASE WHEN B.store_id IS NOT NULL THEN 1 ELSE 0 END AS is_bookmarked
        FROM store
                 LEFT JOIN PackIt.Grade G on store.store_id = G.store_id
                 INNER JOIN PackIt.Bookmark B on store.store_id = B.store_id AND B.pk_user=?
        GROUP BY store.store_id, store.store_name, store.status, store.address, is_bookmarked
        HAVING is_bookmarked = 1


    `;

    const [result] = await pool.execute(query,[pk_user]);
    return result;
};

//북마크 설정
export const postBookmarkService = async (store_id, pk_user) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const checkQuery = `
            SELECT * FROM Bookmark
            WHERE store_id = ? AND pk_user = ?
        `;
        const [checkResult] = await connection.execute(checkQuery, [store_id, pk_user]);

        if (checkResult.length > 0) {
            const deleteQuery = `
                DELETE FROM Bookmark
                WHERE store_id = ? AND pk_user = ?
            `;
            await connection.execute(deleteQuery, [store_id, pk_user]);
        } else {
            const insertQuery = `
                INSERT INTO Bookmark (store_id, pk_user)
                VALUES (?, ?)
            `;
            await connection.execute(insertQuery, [store_id, pk_user]);
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
