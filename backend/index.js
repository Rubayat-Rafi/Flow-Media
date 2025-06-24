require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());


// verify token middleware
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized access"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = decoded;
        next();
    })
}




app.get("/", (req, res) => {
  res.send("Hello from Flow Media Backend!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(port, () => {
      console.log(`Backend server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
