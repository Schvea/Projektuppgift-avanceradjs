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
      date
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'du gör fel' });
  }
});
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta sysslor' });
  }
});
module.exports = router;