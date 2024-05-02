var express = require('express');
var router = express.Router();

require('../models/connections');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
/* GET users listing. */
router.post('/signup', function(req, res,) {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
   }
User.findOne({firstname: req.body.username,firstname: req.body.username }).then(data => {
  if (data === null){
    const hash = bcrypt.haschSync(req.body.password,10);

  const newUser = new User ({
    firstname: req.body.firstname,
    username: req.body.username,
    password: hash,
    token: uid2(32),
  })
  newUser.save().then(dataUser => {
    res.json({ result:true, token: userData.token});
  });
  }else {
    res.json({ result :false, error: 'User already exists'});
  }
})
});

module.exports = router;
