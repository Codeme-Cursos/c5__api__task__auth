const express = require('express');
const taskController = require('../controllers/task.controller');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/tasks', taskController.getTasks)
router.get('/task/:id', taskController.getTaskById)
router.post('/tasks', verifyToken, taskController.createTask)
router.patch('/task/:id', verifyToken, taskController.patchTaskById)
router.delete('/task/:id', verifyToken, taskController.deleteTaskById)

module.exports = router;