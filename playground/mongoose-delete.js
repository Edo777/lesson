const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");

Todo.findOneAndRemove({_id : "5a992574ffcf16d8041c3919"})
    .then((deleted) => {
        console.log(deleted)
    })
    .catch((err) => {
        console.log(err)
    })
