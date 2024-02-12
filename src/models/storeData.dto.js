async function getStoresFromDB(){
    try{
        //DB 가져오는 부분.
        const DB=await read
        const stores=JSON.parse(DB);

        return stores;
    }
    catch(err){
        console.error('error reading DB',error);
    }
}

module.exports=class storesData {
    constructor(id, name, latitude, longitude, address, open, rate, bookmark){
        this.id=id;
        this.name=name;
        this.latitude=latitude;
        this.longitude=longitude;
        this.address=address;
        this.open=opne;
        this.rate=rate;
        this.bookmark=bookmark;
        this.menu=new Map();



        //1.menuId로 메뉴객체 데려오기
        //2.meal과 식사류.
    }

    addMenu(type, menuId, menuName, description, price, size, insulation, liquidSealed, caution) {
        const menu = new Menu(menuId, menuName, description, price, size, insulation, liquidSealed, caution);
        this.menus.set(menuId, menuName);
    }
    //storeId로 가게 찾기
    async findByStoreId(id){
        try{
            const stores= await getStoresFromDB();

            const store=stores.find(store => store.id===id);

            return store;
        }catch(error){
            console.error('Error finding storeId',error);
        }
    }
    async findByMenuId(storeId, menuId) {
        try{
            const store=this.findByStoreId(storeId);
            for(const [menuId, menuName] of this.menu.entries()){
                if(menuId===menuId){
                    return menuName;
                }
            }
        }
        catch(error){
            console.log('Error finding menuId',error);
        }
    }
    async showMeal(storeId) {
        try {
            const store = await this.findByStoreId(storeId); // this를 사용하여 메서드를 호출합니다.
            const meal=[];
            for (const [key, value] of this.menus.entries()) {
                if (value.type === 'meal') {
                    return value; // 'meal'인 메뉴를 배열에 추가합니다.
                }
            }
        } catch (error) {
            console.error('Error showing meal', error);
            throw error; // 오류를 다시 throw하여 호출자에게 전파합니다.
        }
    }
    async showSide(storeId) {
        try {
            const store = await this.findByStoreId(storeId); // this를 사용하여 메서드를 호출합니다.
            const side=[];
            for (const [key, value] of this.menus.entries()) {
                if (value.type === 'side') {
                    return value; // 'meal'인 메뉴를 배열에 추가합니다.
                }
            }
        } catch (error) {
            console.error('Error showing meal', error);
            throw error; // 오류를 다시 throw하여 호출자에게 전파합니다.
        }
    }
}