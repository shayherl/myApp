const express = require('express');
const validate = require('../middleware/validate');

const router = express.Router();

let tasks = [];
let nextId = 1;

const parseId = (req) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return -1;
  }
  return id;
};

router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.post('/', validate, (req, res) => {
  const { title, description = '', priority = 'low', completed = false } = req.body;

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: String(description),
    completed: Boolean(completed),
    createdAt: new Date(),
    priority
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', validate, (req, res) => {
    const id = parseId(req);
    if (id === -1){
        return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const task_id = tasks.findIndex(t => t.id === id);
    if (task_id === -1){
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description = '', priority, completed } = req.body;

    const updated = {
    ...tasks[task_id],
    title: title.trim(),
    description: String(description),
    priority,
    completed: Boolean(completed)
    };

    tasks[task_id] = updated;
    res.status(200).json(updated);
});

router.delete('/:id', (req, res) => {
    const id = parseId(req);
    if (id === -1){
        return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const task_id = tasks.findIndex(t => t.id === id);
    if (task_id === -1){
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.pop(task_id);
    res.sendStatus(204);
});

router.patch('/:id/toggle', (req, res) => {
    const id = parseId(req);
    if (id === -1){
        return res.status(400).json({ error: 'Invalid id parameter' });
    }
    const task_id = tasks.findIndex(t => t.id === id);
    if (task_id === -1){
        return res.status(404).json({ error: 'Task not found' });
    }

  tasks[task_id].completed = !tasks[task_id].completed;
  res.status(200).json(tasks[task_id]);
});

module.exports = router;
