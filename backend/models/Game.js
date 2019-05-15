const   mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = Schema.Types.ObjectId;

// Create Game schema
const gameSchema = Schema({
    game_id: {
        type: String,
        // unique: true,
        required: true
    },
    round: {
        type: Number,
        default: 1
    },
    letterCount: { 
        type: Number, 
        default: 4 
    },
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    user_a_score: {
        type: Number,
        default: 0
    },
    user_b_score: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});


// Feed Game schema into Model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;