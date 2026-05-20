const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/' ,asyncWrapper(taskController.getTasks));

router.get('/:id', asyncWrapper(taskController.getTask));

router.post('/' , asyncWrapper(taskController.createTask));

router.patch('/:id', asyncWrapper(taskController.updTask));

router.delete('/:id', asyncWrapper(taskController.delTask));

module.exports = router;

