const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authmiddleware');
const checkAdmin = require('../middleware/adminmiddleware');

const router = express.Router();

router.get('/users', authenticate, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Kan ej hämta användare' });
  }
});
router.delete('/users/:id', authenticate, checkAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Användare raderad' });
  } catch (err) {
    return res.status(500).json({ error: 'Kunde inte radera användare' });
  }
});
router.patch('/users/:id/role', authenticate, checkAdmin, async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Roll krävs för att uppdatera roll' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Användare hittades inte' });
    }

    return res.json({ message: 'Roll uppdaterad', user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: 'Kunde inte uppdatera roll' });
  }
});
module.exports = router;