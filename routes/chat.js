const express = require('express');
const router = express.Router();
const { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chat.js');
const { protect } = require("../middleware/auth.js");

router.use(protect);

router.route('/')
    .post(accessChat)
    .get(fetchChat)

router.post('/group', createGroupChat)
router.put('/rename', renameGroup)
router.put('/groupRemove', removeFromGroup)
router.put('/groupAdd', addToGroup)

module.exports = router;