const express = require('express');
const Task = require('../models/task');
const authenticate = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/tasks', authenticate, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Skriv titel' });
    }
    const newTask = new Task({
      title,
      description,
      date,
    });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'du gör fel' });
  }
});
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username');
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Kunde inte hämta sysslor' });
  }
});

router.patch('/tasks/:id/assign', authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Uppgift finns inte' });
    }

    if (task.assignedTo) {
      return res.status(400).json({ error: 'Uppgiften är tagen av ngn annan' });
    }

    task.assignedTo = req.user.id;
    await task.save();
    const populatedTask = await task.populate('assignedTo', 'username');
    return res.json({ message: 'Du har tagit uppgiften', task: populatedTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'fel på n' });
  }
});
router.delete('/tasks/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Uppgift finns inte' });
    }
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Uppgift raderad' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Kunde inte radera uppgift' });
  }
});

module.exports = router;
