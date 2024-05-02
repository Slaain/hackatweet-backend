var express = require('express');
var router = express.Router();
require('../models/connection')
require('../models/users')
require('../models/tweets')


router.post('/', async (req, res) => {
    if (!checkBody(req.body, ['token', 'content'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const author = await User.find({token: req.body.token})
    
    if(author){
        const newTweet = new Tweet({
            author: author,
            content: req.body.content,
            created_at: Date.now(),
            usersWhoLiked: [],
            likesCount: 0
        })
        newTweet.save()
        .then(res.json({result: true, newTweet}))
    } else {
        res.json({result: false, error: 'Invalid token'})
    }

});