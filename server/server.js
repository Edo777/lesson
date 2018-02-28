const express = require("express");
const bodyParser = require("body-parser");

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
        .then((doc) => {
            res.send(doc)
        }, (e) => {
            res.status(400).send(e)
        })
})

app.get('/todos', (req, res) => {
    Todo.find({}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.listen(3000, () => {
    console.log("Starting on port 3000");
})

module.exports = {
    app
}