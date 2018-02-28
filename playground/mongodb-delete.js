const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log(err)
    }
    console.log("connected to MongoDB")
    
    db.collection('Users').findOneAndDelete({
        _id : new ObjectID("5a955b14a34e2619446b9d9e")
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    })

    db.close()
})