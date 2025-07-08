require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/user.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const paymentRoutes = require("./routes/payments.route.js");
const freeTrialRoutes = require("./routes/freeTrial.routes.js");
const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes); // optional
app.use("/api", categoryRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/free-trial", freeTrialRoutes);

// Root route
app.get("/", (req, res) => {
  const message = 'It works!';
  const version = 'NodeJS ' + process.versions.node;
  const response = [message, version].join('\n');
  res.setHeader("Content-Type", "text/plain");
  res.send(response);
});

module.exports = app;
