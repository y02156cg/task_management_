const router = require('express').Router();
const { pool } = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1',
      [req.user.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, is_complete } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO tasks (title, description, is_complete, user_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, is_complete || false, req.user.userId]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, is_complete } = req.body;

    const { rowCount } = await pool.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        is_complete = COALESCE($3, is_complete)
       WHERE id = $4 AND user_id = $5`,
      [title, description, is_complete, taskId, req.user.userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { rowCount } = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, req.user.userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;