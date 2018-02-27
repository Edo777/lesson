const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log(err)
    }
    console.log("connected to MongoDB")
    
    db.collection('Users').findOneAndDelete({
        completed: false
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    })

    db.close()
})