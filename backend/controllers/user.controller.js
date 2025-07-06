require("dotenv").config();
const { ObjectId } = require("mongodb");
const client = require("../lib/db_connection/db_connection.js");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const { name, email, password } = req.body;
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", user: existingUser });
    }

    const subscriptionOwner = await usersCollection.findOne({
      "subscription.emails": email,
      "subscription.status": "active",
    });

    const isSubscribed = Boolean(subscriptionOwner);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      subscribe: isSubscribed,
      revenue: [],
      timestamp: Date.now(),
    };
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      user: { ...newUser, password: undefined },
      result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.userRole = async (req, res) => {
  const db = client.db("flow_media");
  const usersCollection = db.collection("users");
  const email = req.params.email;
  const query = { email };
  try {
    const user = await usersCollection.findOne(query, {
      projection: { password: 0 },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ role: user.role, userData: user });
  } catch (err) {
    res.status(500).json({ message: "Role Not Found", error: err.message });
  }
};

exports.allUserData = async (req, res) => {
  const db = client.db("flow_media");
  const usersCollection = db.collection("users");
  const myEmail = req.params.email;
  try {
    const users = await usersCollection
      .find({ email: { $ne: myEmail } }, { projection: { password: 0 } })
      .toArray();

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Faild to load user data", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const db = client.db("flow_media");
  const usersCollection = db.collection("users");
  const id = req.params.id;
  const { role } = req.body;
  const updateDoc = { $set: { role } };

  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user data", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const users = db.collection("users");
    const email = req.params.id;
    const result = await users.findOneAndDelete({ email });
    if (!result) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    } else {
      return res
        .status(200)
        .json({ message: "User deleted successfully", success: true });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user",
      error: err.message,
      success: false,
    });
  }
};

// get user data
exports.userData = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const users = db.collection("users");
    const email = req.params.email;
    
    if (!email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }
    const user = await users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
