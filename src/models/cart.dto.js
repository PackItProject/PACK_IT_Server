class CartDTO {
    constructor(userId, storeId, menuId,quantity) {
        this.pk_user = userId;
        this.store_Id = storeId;
        this.menu_Id = menuId;
        this.quantity=quantity;
    }
}
export { CartDTO };
