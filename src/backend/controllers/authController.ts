import pool from '../utils/db';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
      [email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Server error.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const userQuery = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    if (user.blocked) {
      // Explicitly return if the user is blocked
      return res.status(403).json({ error: 'This user is blocked.' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    await pool.query(`UPDATE users SET last_logged_in = NOW() WHERE id = $1`, [user.id]);

    res.json({ token });
  } catch (error) {
    console.error('Login backend error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};
