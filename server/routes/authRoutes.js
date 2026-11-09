const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "ohaki-secret";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

router.post("/register", async (req, res) => {
  const { name, email, password_hash } = req.body || {};

  if (!name || !email || !password_hash) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rowCount > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Unable to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password_hash } = req.body || {};

  if (!email || !password_hash) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password_hash, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.cookie("token", token, cookieOptions);

    return res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Unable to log in" });
  }
});

router.get("/me", protect, async (req, res) => {
  return res.json(req.user);
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  return res.json({ message: "Logout Successful" });
});

module.exports = router;
