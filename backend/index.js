require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// verify token middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// routes
app.get("/", (req, res) => {
  res.send("Hello from Flow Media Backend!");
});

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("flow_media");
    const usersCollection = db.collection("users");

    // save user in database
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;

      const isExist = await usersCollection.findOne(query);
      if (isExist)
        return res
          .status(409)
          .json({ message: "User already exists", user: isExist });

      const newUser = {
        name: user.name,
        email: user.email,
        role: "user",
        subscribe: false,
        timestamp: Date.now(),
      };

      const result = await usersCollection.insertOne(newUser);
      res.status(201).json(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
    app.listen(port, () => {
      console.log(`Backend server is running on port: ${port}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
