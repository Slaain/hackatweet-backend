var express = require('express');
var router = express.Router();
require('../models/connections')
const User = require('../models/users')
const Tweet = require('../models/tweets')
const { checkBody } = require('../modules/checkBody');



router.post('/', async (req, res) => {
    if (!checkBody(req.body, ['token', 'content'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const author = await User.findOne({token: req.body.token})

    if(author){
        console.log(author)
        const newTweet = new Tweet({
            author: author._id,
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

router.get('/', (req, res) => {
    Tweet.find()
    .populate('author', 'firstname username')
    .then(data => {
        res.json({result: true, data})
    })
})

module.exports = router;