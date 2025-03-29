import pool from '../utils/db';

export const getUsers = async (req, res) => {
  const { order = 'asc' } = req.query;

  try {
    const result = await pool.query(
      `SELECT id, email, blocked, last_logged_in as "lastLoggedIn"
       FROM users ORDER BY last_logged_in ${order === 'desc' ? 'DESC' : 'ASC'}`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const blockUsers = async (req, res) => {
  const { ids } = req.body;
  await pool.query('UPDATE users SET blocked = true WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};

export const unblockUsers = async (req, res) => {
  const { ids } = req.body;
  await pool.query('UPDATE users SET blocked = false WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};

export const deleteUsers = async (req, res) => {
  const { ids } = req.body;
  await pool.query('DELETE FROM users WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};
