const express = require('express');
const taskRoutes = require('./routes/task.routes');
const logger = require('./middlewares/logger.middleware');
const validateTask = require('./middlewares/validateTask.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();


app.use(express.json());
app.use(logger);
app.use('/tasks', taskRoutes);
app.use(validateTask);

app.use(errorHandler);

module.exports = app;