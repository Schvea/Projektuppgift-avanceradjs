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
router.delete('/users/:id', authenticate, checkAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Användare raderad' });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte radera användare' });
  }
});

module.exports = router;