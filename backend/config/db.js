import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'luxe_interiors_db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log(`[MySQL Pool Config] host=${poolConfig.host}, port=${poolConfig.port}, user=${poolConfig.user}, db=${poolConfig.database}, pwd_len=${poolConfig.password ? poolConfig.password.length : 0}`);

const pool = mysql.createPool(poolConfig);

// Immediately test connection to notify the developer
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✦ MySQL Connection Established Successfully ✦');
    connection.release();
  } catch (error) {
    console.warn('\n⚠️  MYSQL CONNECTION STATUS: OFFLINE');
    console.warn('   Ensure local MySQL is running and backend/schema.sql has been executed.');
    console.warn(`   Error Detail: ${error.message}\n`);
  }
})();

export default pool;
