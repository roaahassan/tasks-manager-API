const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/' , taskController.getTasks);

router.get('/', taskController.getTask);

router.post('/' , taskController.createTask);

module.exports = router;

