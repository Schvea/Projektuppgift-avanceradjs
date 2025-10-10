const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware');

router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'inlog',
    user: req.user
  });
});

module.exports = router;