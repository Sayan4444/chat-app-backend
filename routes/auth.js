const express = require('express');
const router = express.Router();
const { signup, signin, signout, getMe } = require('../controllers/auth.js');
const { protect } = require("../middleware/auth.js");

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.get('/me', protect, getMe);

module.exports = router;