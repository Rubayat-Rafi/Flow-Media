require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const subsCriptionRoutes = require("./routes/subscription.routes.js");
const userRoutes = require("./routes/user.routes.js");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

async function run() {
  try {

    // routes
    app.use("/api/user", subsCriptionRoutes);
    app.use("/api/user", userRoutes);

    // default route
    app.get("/", (req, res) => {
      res.send("🌐 Flow Media Backend Running");
    });

    app.listen(port, () => {
      console.log(`🚀 Backend server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
  }
}

run().catch(console.dir);
