import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

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
export { pool }; 
