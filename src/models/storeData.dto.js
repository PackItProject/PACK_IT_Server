module.exports=class storesData {
    constructor(id, name, latitude, longitude, address, open, rate, bookmark) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.open = open;
        this.rate = rate;
        this.bookmark = bookmark;
    }
}
