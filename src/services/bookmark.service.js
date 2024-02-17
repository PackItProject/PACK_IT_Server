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

export const getBookmarkedStoreList=async(pk_user)=>{
    const query=`
        SELECT store.store_id, store.store_name, store.grade, store.status, store.address, store.image, Bookmark.pk_user
        From store
        INNER JOIN Bookmark on store.store_id=Bookmark.store_id
        WHERE Bookmark.pk_user=? 
    `;

    const [rows]=await pool.execute(query, [pk_user]);

    return rows;
};
export const getBookmarkedByStoreId = async (store_id, pk_user) => {
    const query=`
        SELECT store.store_id, store.image, menu.menu_category,menu.id, menu.menu_name, menu.image,menu.price, menu.containter, Bookmark.pk_user
        FROM store
                 INNER JOIN menu on store.store_id=menu.store_id
                 INNER JOIN Bookmark on store.store_id=Bookmark.store_id
        WHERE store.store_id=? AND Bookmark.pk_user=?
    `;
    const params = [store_id, pk_user];
    const [rows] = await pool.execute(query, params);

    return rows;
}

//menuId로 메뉴 조회
export const getBookmarkedByMenuId=async(store_id, menu_id,pk_user)=>{
    const query=`
        SELECT menu.*,store.store_id, Bookmark.pk_user
        FROM menu
                 INNER JOIN store on store.store_id=menu.store_id
                 INNER JOIN Bookmark on store.store_id=Bookmark.store_id
        WHERE menu.store_id=? AND menu.id=? AND Bookmark.pk_user=?`;
    const params=[store_id, menu_id, pk_user];
    const [rows]=await pool.execute(query, params);

    return rows;
}

export const getBookmarkedMeal=async(storeId, pk_user)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image, Bookmark.pk_user
        FROM menu 
        INNER JOIN Bookmark on menu.store_id=Bookmark.store_id
        WHERE menu.store_id=? AND menu.menu_category=1 AND Bookmark.pk_user=?`;
    const param=[storeId, pk_user];
    const [rows]=await pool.execute(query, param);

    return rows;
}

export const getBookmarkedSide=async(storeId)=>{
    const query=`
        SELECT menu.id, menu.store_id, menu.menu_name, menu.price, menu.containter, menu.insulation, menu.liquid_seal, menu.about_menu, menu.image, Bookmark.pk_user
        FROM menu
                 INNER JOIN Bookmark on menu.store_id=Bookmark.store_id
        WHERE menu.store_id=? AND menu.menu_category=0 AND Bookmark.pk_user=?`;
    const param=[storeId];
    const [rows]=await pool.execute(query, param);

    return rows;
}
