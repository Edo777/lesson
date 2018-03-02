const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const { mongoose } = require('./db/mongoose');
const { User } = require("./models/user");
const { Todo } = require("./models/todo");
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save()
        .then((todos) => {
            res.send({todos})
        }, (e) => {
            res.status(400).send(e)
        })
})

app.get('/todos', (req, res) => {
    Todo.find({}).then((result)=>{
        res.send({result})
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("invalid user")
    }

    Todo.findById(id)
        .then((todo) => {
           if(!todo) {
               return res.status(404).send()
           }
           res.send({todo})
        }, (err) => {
            res.status(400).send(err);
        })

})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id)
        .then((deleted) => {
            if(!deleted){
                return res.status(400).send()
            }
            res.send({deleted})
        })
        .catch((error) => {
            res.status(400).send();
        })
})

app.listen(3000, () => {
    console.log("Starting on port 3000");
})

module.exports = {
    app
}