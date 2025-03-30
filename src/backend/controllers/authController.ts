import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../server.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
      [email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email already exists.' });
      return;
    }
    res.status(500).json({ error: 'Server error.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    const userQuery = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userQuery.rows[0];

    if (!user) {
      res.status(400).json({ error: 'Invalid credentials.' });
      return;
    }
    if (user.blocked) {
      res.status(403).json({ error: 'This user is blocked.' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ error: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    await pool.query(`UPDATE users SET last_logged_in = NOW() WHERE id = $1`, [user.id]);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};
