const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const pool = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Ohaki server is running");
});

app.post("/api/events", async (req, res) => {
  const { message, stack, timestamp } = req.body || {};

  try {
    const result = await pool.query(
      `INSERT INTO events (message, stack, occured_at)
       VALUES ($1, $2, COALESCE($3::timestamptz, NOW()))
       RETURNING *`,
      [message ?? null, stack ?? null, timestamp ?? null]
    );

    res.status(201).json({
      success: true,
      message: "Error saved successfully!",
      event: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save error",
    });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY occured_at DESC");

    res.status(200).json({
      success: true,
      count: result.rows.length,
      events: result.rows,
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve events",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Ohaki running on http://localhost:${PORT}`);
});