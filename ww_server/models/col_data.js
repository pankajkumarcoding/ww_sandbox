const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const col_data_schema = new Schema({
    f   : String,
    i   : String,
    s   : String,
    col : Number, 
    rv  : Number,
    r0  : Number,
    r1  : Number,
    r2  : Number,
    r3  : Number,
    r4  : Number
});

module.exports = mongoose.model('Cost', col_data_schema); // Defining a model,"extended by Collection in MongoDB"