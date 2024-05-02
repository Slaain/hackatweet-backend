const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	content: String,
    created_at: Date,
	usersWhoLiked: [String],
    likesCount: Number
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;