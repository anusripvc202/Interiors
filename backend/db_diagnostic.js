import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("Testing connection with settings:");
console.log(`- Host:     ${process.env.DB_HOST}`);
console.log(`- User:     ${process.env.DB_USER}`);
console.log(`- Port:     ${process.env.DB_PORT || 3306}`);
console.log(`- Database: ${process.env.DB_NAME}\n`);

(async () => {
  try {
    // 1. Test connection to server
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
    });
    console.log("✅ Successfully connected to local MySQL server!");

    // 2. Test database existence
    try {
      await connection.query(`USE \`${process.env.DB_NAME || 'luxe_interiors_db'}\``);
      console.log(`✅ Database "${process.env.DB_NAME}" exists and is accessible!`);
    } catch (dbError) {
      console.error(`❌ DATABASE MISSING: Code ${dbError.code}`);
      console.error(`   Message: ${dbError.message}`);
    }

    await connection.end();
  } catch (error) {
    console.error(`❌ SERVER UNREACHABLE: Code ${error.code}`);
    console.error(`   Message: ${error.message}`);
  }
})();
