require("dotenv").config();
const { ObjectId } = require("mongodb");
const client = require("../lib/db_connection/db_connection.js");
exports.categories = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const categoryCollection = db.collection("categorys");
    const category = req.body;
    const result = await categoryCollection.insertOne(category);
    if (result.insertedId) {
      res
        .status(201)
        .json({ message: "Category added", id: result.insertedId });
    } else {
      res.status(400).json({ message: "Failed to add category" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.allCategorys = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const categoryCollection = db.collection("categorys");
    const result = await categoryCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.findForPlay = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const categoryCollection = db.collection("categorys");
    const id = req.params.id;
    const result = await categoryCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.categoryDelete = async (req, res) => {
  const db = client.db("flow_media");
  const categoryCollection = db.collection("categorys");
  const id = req.params.id;
  try {
    const result = await categoryCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const categoryCollection = db.collection("categorys");
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) };
    const result = await categoryCollection.updateOne(filter, { $set: data });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.countDown = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const categoryCollection = db.collection("categorys");
    const id = req.params.id;

    const category = await categoryCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    const targetDate = new Date(category.targetDate);
    const now = new Date();

    if (targetDate <= now) {
      return res.status(200).json({
        message: "Countdown Expired",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Countdown is still active — match not started yet",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
