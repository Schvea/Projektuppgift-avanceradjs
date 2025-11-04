const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authmiddleware');
const checkAdmin = require('../middleware/adminmiddleware');
const bcrypt = require('bcrypt');


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
router.post('/users', authenticate, checkAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Alla fält ska vara ifyllda' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email finns redan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    return res.status(201).json({ message: 'Användare skapad av admin', user: { username, email, role: newUser.role } });
  } catch (err) {
    console.error('Kunde inte skapa användare', err);
    console.error('Full error object:', JSON.stringify(err, null, 2));
    return res.status(500).json({ message: 'Fel vid skapande av användare', error: err.message });
  }
});

module.exports = router;