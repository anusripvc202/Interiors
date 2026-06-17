import mysql from 'mysql2/promise';

(async () => {
  try {
    console.log("Connecting to Railway cloud MySQL database to run migration...");
    const connection = await mysql.createConnection({
      host: 'shinkansen.proxy.rlwy.net',
      port: 39129,
      user: 'root',
      password: 'eybDFMjTWJzjRQhuinWaaICSPGyAitPX',
      database: 'luxe_interiors_db'
    });
    console.log("✅ Connected successfully to Railway cloud server!");

    console.log("Altering designer_profiles.avatar_url to LONGTEXT...");
    await connection.query("ALTER TABLE designer_profiles MODIFY COLUMN avatar_url LONGTEXT NULL;");
    console.log("✅ Cloud database schema altered successfully!");

    await connection.end();
  } catch (error) {
    console.error("❌ Cloud migration failed:", error);
  }
})();
