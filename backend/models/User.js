const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

// Create User schema
const userSchema = Schema({
    email: {
        type: String,
        unique: false
    },
    nickname: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    word: String, 
    s_word: String,
    wins: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});


// Feed Game schema into Model
const User = mongoose.model('User', userSchema);

module.exports = User;