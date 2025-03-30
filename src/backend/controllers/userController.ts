import { Request, Response } from 'express';
import { pool } from '../server.js';

export const getUsers = async (req: Request, res: Response) => {
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
  try {
    const result = await pool.query(
      `SELECT id, email, blocked, last_logged_in FROM users ORDER BY last_logged_in ${order}`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

export const blockUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;
  await pool.query('UPDATE users SET blocked = true WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};

export const unblockUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;
  await pool.query('UPDATE users SET blocked = false WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};

export const deleteUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;
  await pool.query('DELETE FROM users WHERE id = ANY($1)', [ids]);
  res.json({ success: true });
};
