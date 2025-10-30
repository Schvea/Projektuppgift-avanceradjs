function checkAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Endast admin har åtkomst' });
  }
  next();
}

module.exports = checkAdmin;
