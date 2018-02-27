const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log(err)
    }

    db.collection('Users').insert({
        completed : false
    })

    db.close()
})