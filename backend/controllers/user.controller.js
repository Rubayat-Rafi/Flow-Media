const client = require("../lib/db_connection/db_connection.js");
const bcrypt = require("bcryptjs");
exports.registerUser = async (req, res) => {
  try {
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");
    const { name, email, password } = req.body;
    const query = { email: email };
    const isExist = await usersCollection.findOne(query);
    if (isExist) {
      return res
        .status(409)
        .json({ message: "User already exists", user: isExist });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hasedPassword,
      role: "user",
      subscribe: false,
      timestamp: Date.now(),
    };
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User registered", result });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.userRole = async (req, res) => {
try {
  const db = client.db("flow_media");
  const usersCollection = db.collection("users");
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.send({ role: user.role });
} catch (err) {
  res.status(500).json({ message: "Role Not Found", error: err.message });
}
};
