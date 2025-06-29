require("dotenv").config();
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
