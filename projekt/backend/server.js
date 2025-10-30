const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is working');
});

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const loginRoute = require('./routes/login');

app.use('/api', loginRoute);

const testRoute = require('./routes/test');

app.use('/api', testRoute);

const adminRoutes = require('./routes/admin');

app.use('/api/admin', adminRoutes);

const taskRoute = require('./routes/tasks');

app.use('/api', taskRoute);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('MongoDB works');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
