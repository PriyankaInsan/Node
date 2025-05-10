const db = require("../utils/databaseUtil");

module.exports= class Favorite{

   static getFavoriteList(){
        return db.execute('SELECT * FROM favoriteIds');
    }

    static postFavoriteList(homeId){
        return db.execute('INSERT INTO favoriteIds(id) VALUES (?)',[homeId]);

    }
}
