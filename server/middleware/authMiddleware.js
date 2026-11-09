const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ohaki-secret");
    const userResult = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [decoded.id]);

    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userResult.rows[0];
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "User not authorized" });
  }
};

module.exports = { protect };
