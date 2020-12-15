var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    mobile_Number: {
        type: Number,
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    date_Of_Birth: {
        type: String
    },
    age: {
        type: Number
    },
    image: {
        type: String
    },
    lastLogin: {
        type: String
    }
})


module.exports = mongoose.model("User", UserSchema);