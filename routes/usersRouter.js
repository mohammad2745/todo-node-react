const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, usersController.getAllUsers);

module.exports = router;