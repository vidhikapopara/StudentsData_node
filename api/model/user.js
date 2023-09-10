const mongoose = require('mongoose');
userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender : {
        type: String,
        required: true
    },
    age :{
        type: Number,
        required: true
    },
    newpassword : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('user', userSchema);