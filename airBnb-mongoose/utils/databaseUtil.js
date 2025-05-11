const mongo= require('mongodb');
const MongoClient = mongo.MongoClient;

const url= 'mongodb+srv://root:Ddstha%407@clusterpk.ykznxhv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPK';

let _db= '';
const mongoConnect=(callback)=>{
    MongoClient.connect(url).then((client)=>{
        _db=client.db('airbnb')
        callback(client);
}).catch(err=>{
    console.log("err in connection to mongo", err);
})
}

const getDB=()=>{
    if(!_db){
        throw new Error("mongo not connected");
    }
    return _db;
}
exports.mongoConnect= mongoConnect;
exports.getDB=getDB;