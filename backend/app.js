const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const authRoutes = require('./router/auth');
const taskRoutes = require('./router/tasks');
const { authenticate } = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', authenticate, taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});