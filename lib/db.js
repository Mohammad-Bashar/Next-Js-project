import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bashar529@",
  database: "schooldb",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// 🔍 Test connection immediately
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
  }
})();

export default pool;
