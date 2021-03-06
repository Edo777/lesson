var mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id : user._id.toHexString()}, 'secret').toString();

    user.tokens.push({
        access,
        token
    })
    return new Promise((resolve, reject) => {
        resolve(token);
    })
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded; 
    try {
        decoded = jwt.verify(token, 'secret');

    } catch (error) {
        return Promise.reject(error);
    }

    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })

}

var User = mongoose.model("Users", UserSchema)

module.exports = { User }