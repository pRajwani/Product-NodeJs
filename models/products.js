var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName:{
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("product", productSchema)