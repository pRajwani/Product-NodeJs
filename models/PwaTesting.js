const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PwaTestingSchema = new Schema({
    name: {
        type:String
    },
    image: {
        type:String
    }
})

module.exports = mongoose.model('pwaTesting', PwaTestingSchema);