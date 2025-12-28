
import multer from "multer";

import path from "path";
import pool from "../../lib/db";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public/schoolImages"),
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  upload.single("image")(req, res, async (err) => {
    try {
      if (err) throw err;

      const { name, address, city, state, contact, email_id } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      const image = req.file.filename;

      await pool.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      res.status(200).json({ message: "School Added Successfully" });

    } catch (error) {
      console.error("ADD SCHOOL ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });
}
