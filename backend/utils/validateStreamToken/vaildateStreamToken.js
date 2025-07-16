require("dotenv").config();
const jwt = require("jsonwebtoken")
const STREAM_SECRET = process.env.STREAM_TOKEN_SECRET;
exports.validateStreamToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const data = jwt.verify(token, STREAM_SECRET);
    req.streamData = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
