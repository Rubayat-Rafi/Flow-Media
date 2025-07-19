require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const {
  resolveM3u8SecureUrlFromDB,
} = require("../utils/resolveM3u8SecureUrlFromDB/resolveM3u8SecureUrlFromDB.js");
exports.proxy = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.params.token;
    jwt.verify(token, process.env.STREAM_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    });
    const streamUrl = await resolveM3u8SecureUrlFromDB(id);
    try {
      const response = await axios.get(streamUrl, { responseType: "stream" });
      res.set(response.headers);
      response.data.pipe(res);
    } catch (err) {
      res.status(500).json({ error: "Stream unavailable" });
    }
  } catch (error) {}
};
exports.streamToken = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing stream ID" });
    }
    const payload = {
      streamId: id,
    };
    const token = jwt.sign(payload, process.env.STREAM_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res
      .status(200)
      .json({ token, message: "Token generated successfully" });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
