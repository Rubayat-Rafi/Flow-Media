require("dotenv").config();
const { ObjectId } = require("mongodb");
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

exports.allPricing = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const pricingCollection = db.collection("pricing");

    const result = await pricingCollection.find().toArray();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deletePricing = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const pricingCollection = db.collection("pricing");
    const id = req.params.id;

    // Validate and convert the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const filter = { _id: new ObjectId(id) };
    const result = await pricingCollection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    res.status(200).json({ message: "Pricing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const pricingCollection = db.collection("pricing");

    const { id } = req.params;
    const updateData = req.body;

    const result = await pricingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Pricing not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made, but document exists", result });
    }

    res.status(200).json({ message: "Pricing updated successfully", result });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
