const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");
const db= getDB();

module.exports= class Favorite{

   static getFavoriteList(){
        return db.collection("favorite").find().toArray();
        // return db.execute('SELECT * FROM favoriteIds');
    }

    static postFavoriteList(home){
        return db.collection("favorite").insertOne(home);

        // return db.execute('INSERT INTO favoriteIds(id) VALUES (?)',[homeId]);

    }
}
