const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log(err)
    }
    console.log("connected to MongoDB")
    
    db.collection('Users').findOneAndUpdate({
        _id : new ObjectID("5a966fd727f1a225f82f0f7a")
    } , {
        $set : {
            name: "armen",
        },
        $inc : {
            age : 5
        }
    }, {
        returnOriginal : false,
    }) .then((result) => {
        console.log(JSON.stringify(result, undefined, 2))
    })

    db.close()
})