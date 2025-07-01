require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");

// Free trial: Check status by IP
exports.checkStatus = async (req, res) => {
  try {
    const db = client.db("FreeTrails");
    const freeTrialCollection = db.collection("free_trials");
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    const trial = await freeTrialCollection.findOne({ ip });

    if (trial) {
      return res.status(200).json({ used: true });
    } else {
      return res.status(200).json({ used: false });
    }
  } catch (err) {
    console.error("Trial check error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Free trial: Start (register IP)
exports.traialStart = async (req, res) => {
  try {
    const db = client.db("FreeTrails");
    const freeTrialCollection = db.collection("free_trials");
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    const existing = await freeTrialCollection.findOne({ ip });

    if (existing) {
      return res
        .status(400)
        .json({ used: true, message: "Trial already used" });
    }

    await freeTrialCollection.insertOne({ ip, startedAt: new Date() });

    return res
      .status(200)
      .json({ used: false, message: "Trial started successfully" });
  } catch (err) {
    console.error("Trial start error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
