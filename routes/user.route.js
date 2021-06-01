const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/users', userController.getUsers)
router.delete('/user/:id', verifyToken, userController.deleteUserById)

module.exports = router;