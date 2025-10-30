const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Koll så alla fält är ifyllda
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Alla fält ska vara ifyllda' });
    }

    // Så att ingen registrerar samma mejl flera gånger
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email finns' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // skapa
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Användare skapad' });
  } catch (err) {
    console.error('Kunde inte skapa användare', err);
    return res.status(500).json({ message: 'fel', error: err.message });
  }
});

module.exports = router;
