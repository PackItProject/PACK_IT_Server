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
    }
    //storeId로 가게 찾기
    static findByStoreId(storeId, cb){

    }
}

//DB에서 stores 불러오기.
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

async function findByStoreId(id){
    try{
        const stores=await getStoresFromDB();

        const store=stores.find(id => store.id=id);

        return store;
    }catch(error){
        console.error('Error finding storeId',error);
    }
}