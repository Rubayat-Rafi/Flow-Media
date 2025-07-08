require("dotenv").config();
const client = require("../lib/db_connection/db_connection.js");

exports.addPricing = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const pricingCollection = db.collection("pricing");
    const pricing = req.body;
    const result = await pricingCollection.insertOne(pricing);
    res
      .status(201)
      .json({ message: "Pricing added successfully", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
