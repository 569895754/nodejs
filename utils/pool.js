let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://134.175.50.144:27017";

function getMongoData(dbName, collectionName, whereStr) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) {
                reject(err);
            }
            let dbo = db.db(dbName);
            console.log(whereStr)
            dbo.collection(collectionName).find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                }
                resolve(result);
                db.close();
            })
        })
    })
}

function insertMongoData(dbName, collectionName, myobj) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) {
                reject(err);
            }
            let dbo = db.db(dbName);
            dbo.collection(collectionName).insertOne(myobj, function (err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                }
                resolve(result);
                db.close();
            })
        })
    })
}

function updateMongoData(dbName, collectionName, whereStr, myobj) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) {
                reject(err);
            }
            let dbo = db.db(dbName);
            dbo.collection(collectionName).updateOne(whereStr, {$set: myobj}, function (err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                }
                resolve(result);
                db.close();
            })
        })
    })
}

function deleteMongoData(dbName, collectionName, whereStr) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) {
                reject(err);
            }
            let dbo = db.db(dbName);
            dbo.collection(collectionName).deleteOne(whereStr, function (err, result) { // 返回集合中所有数据
                if (err) {
                    reject(err)
                }
                resolve(result);
                db.close();
            })
        })
    })
}

module.exports = {
    getMongoData,
    insertMongoData,
    updateMongoData,
    deleteMongoData
};