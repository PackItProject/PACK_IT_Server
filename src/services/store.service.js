import { storeResponseDTO } from "../dtos/store.response.dto.js";

export const getStoreData = async (store_id) => {
    console.log("store.service.js 실행");

    const query = 
        SELECT
    return storeResponseDTO({
        store_name: "맛집",
        tel: 201010101,
        address: "서대문구 대현동",
        boss: "사장",
        license: 1,
        hours: "3:00-9:00",
        introduction: "안녕하세요",
        notice: "주의사항",
        status: 0
    });
}

export const getOrderListsService = async (pk_user) => {
    const query = `
        SELECT 
            \`order\`.id, 
            \`order\`.created_at, 
            store.store_name, 
            \`order\`.pickup_time, 
            SUM(order_menu.quantity) as quantity
        FROM User
        INNER JOIN \`order\` ON User.pk_user=\`order\`.pk_user
        INNER JOIN store ON \`order\`.store_id = store.id
        INNER JOIN order_menu ON \`order\`.id=order_menu.id
        WHERE User.pk_user=?
        GROUP BY 
            \`order\`.id, 
            \`order\`.created_at, 
            store.store_name, 
            \`order\`.pickup_time
    `;

    const [rows] = await pool.execute(query, [pk_user]);
    return rows;
};