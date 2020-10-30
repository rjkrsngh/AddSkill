const router = require('express').Router();
const taskModifiers = require('../controllers/tasks.js');

// router to url: domain/tasks/
router.get('/', taskModifiers.listTasks)

// router to url: domain/create for creating a task
router.post('/create', taskModifiers.createTask);

// router to url: domain/update for updating a task status
router.patch('/update', taskModifiers.updateTask);

// router to url: domain/delete for removing a task
router.delete('/delete', taskModifiers.deleteTask);

module.exports = router;