import pool from './db';

const checkDBConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    const table = await client.query(`SELECT * FROM users`);
    console.log("✅ Database connected:", res.rows[0]);
    console.log("✅ Users table:", table.rows[0]);
    client.release();
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export default checkDBConnection;
