const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
        default: ""
    },

    lastname : {
        type: String,
        default: ""
    },

    email : {
        type: String,
        default: ""
    },

    password : {
        type: String,
        default: ""
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
});

// Generate Hash
const salt = bcrypt.genSaltSync(8);
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, salt, null);
}

// validate password
UserSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);