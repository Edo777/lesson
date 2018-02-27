const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log(err)
    }

    db.collection('Users').find({
        completed : false
    }).count().then((count) => {
        console.log(`count = ${count}`)
    })

    db.close()
})