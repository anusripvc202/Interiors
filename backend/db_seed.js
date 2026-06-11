import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      multipleStatements: true
    });
    console.log("✅ Connected to MySQL server.");

    const sqlPath = path.resolve('schema.sql');
    console.log(`Reading schema.sql from: ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log("Executing SQL queries in schema.sql...");
    await connection.query(sql);
    console.log("✅ Database successfully recreated and seeded!");

    await connection.end();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
})();
