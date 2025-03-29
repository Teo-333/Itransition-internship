import pool from './db';

const checkDBConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log("✅ Database connected:", res.rows[0]);
    client.release();
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export default checkDBConnection;
