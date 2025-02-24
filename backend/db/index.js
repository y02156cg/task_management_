const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'task_management_db',
  password: 'password',
  port: 5432,
});

module.exports = { pool };