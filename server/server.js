const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { ObjectID } = require("mongodb");
const { mongoose } = require('./db/mongoose');
const { User } = require("./models/user");
const { Todo } = require("./models/todo");
var app = express();


app.use(morgan('dev'));
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


app.patch("/todos/:id", (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
        console.log(body)
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set : body}, {returnOriginal : false})
        .then((todo) => {
            if(!todo){
                return res.status(404).send()
            }
            res.send({todo})
        })
        .catch((err) => {
            res.status(400).send()
        })
})

app.post('/user', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user_r = new User(body);

    user_r.generateAuthToken().then((token) => {
        user_r.save().then((us) => {
            res.header("x-auth", token).send(us)
        })
    })
})

var authentificate = function(req, res, next){
    var token = req.header('x-auth');
    User.findByToken(token)
        .then((user) => {
            if(!user){
               return Promise.reject({
                   message : "not user"
               })
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch((err) => {
            res.status(401).send(err);
        })
}

app.get('/user/me', authentificate, (req, res) => {
    console.log(req.token);
    res.send(req.user);
})

app.listen(3000, () => {
    console.log("Starting on port 3000");
})

