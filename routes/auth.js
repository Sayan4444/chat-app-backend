const express = require('express');
const router = express.Router();
const { signup, getUserInfo, signout } = require('../controllers/auth.js');
const passport = require('passport');

router.post('/signup', signup);
router.post('/signin', passport.authenticate('local', { failureMessage: 'invalid credentials' }), (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
});
router.post('/signout', signout)
router.get('/me', getUserInfo)


module.exports = router;