var mongoose = require("mongoose");
const validator = require("validator");

var User = mongoose.model("Users", {
    email : {
        type: String,
        required : true,
        trim : true,
        minlength : 1,
        unique: true,
        validate: {
            validator : validator.isEmail,
            message : "{VALUE} is not a valid email"
        }
    },
    password : {
        type : String,
        minlength : 6,
        required : true
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
})

module.exports = { User }