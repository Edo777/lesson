var {mongoose} = require("../server/db/mongoose");
var {Todo} = require("../server/models/todo");
var {User} = require("../server/models/user");


User.findById("5a96e431739dbb2d8cc3465d")
    .then((user) => {
        if(!user){
            return console.log("not user")
        }
        console.log(JSON.stringify(user, undefined, 2));
    }, (e) => {
        console.log(e);
    })
