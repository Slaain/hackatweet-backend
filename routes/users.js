var express = require('express');
var router = express.Router();

require('../models/connections');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/signups', function(req, res,) {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
   }
User.findOne({firstname: req.body.username,firstname: req.body.username }).then(data => {
  if (data === null){
    const hash = bcrypt.hashSync(req.body.password, 10)

  const newUser = new User ({
    firstname: req.body.firstname,
    username: req.body.username,
    password: hash,
    token: uid2(32),
  })
  newUser.save().then(dataUser => {
    res.json({ result:true,  dataUser});
  });
  }else {
    res.json({ result :false, error: 'User already exists'});
  }
})
});

router.post('/signins', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true,  data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});


module.exports = router;
