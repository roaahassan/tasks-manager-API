const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/' , taskController.getTasks);

router.get('/:id', taskController.getTask);

router.post('/' , taskController.createTask);

router.patch('/:id', taskController.updTask);

router.delete('/:id', taskController.delTask);

module.exports = router;

