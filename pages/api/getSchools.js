import pool from "../../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, address, city, image FROM schools"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
