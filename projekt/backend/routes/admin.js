const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authmiddleware');
const checkAdmin = require('../middleware/adminmiddleware');

const router = express.Router();

router.get('/users', authenticate, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Kan ej hämta användare' });
  }
});

module.exports = router;