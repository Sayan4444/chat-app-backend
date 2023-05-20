const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user.js');
const { protect } = require("../middleware/auth.js");

router.use(protect);

router.get('/', getUser);

module.exports = router;