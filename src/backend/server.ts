import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Setup database connection explicitly for Heroku PostgreSQL
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Basic middleware
app.use(express.json());
app.use(cors());

// Explicit API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve frontend explicitly from dist (production)
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Dynamic Heroku Port
const PORT = process.env.PORT || 5000;

// Start server explicitly
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Export pool explicitly for use in controllers
export { pool };