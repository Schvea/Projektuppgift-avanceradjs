const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    //Finns användaren
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Användaren finns inte" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ error: "Fel lösenord" });
    }
    //jwt
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
    //Svar
    return res.status(200).json({
      message: "Inloggad",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
}catch (err) {
    console.error('Inloggningsfel:', err);
    return res.status(500).json({ error: "Serverfel" });
  }
});

module.exports = router;