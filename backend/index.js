require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/user.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const paymentRoutes = require("./routes/payments.routes.js");
const freeTrialRoutes = require("./routes/freeTrial.routes.js");
const pricingRoutes = require("./routes/pricing.routes.js");
const affiliateRoutes = require("./routes/affiliate.routes.js");
const verifyToken = require("./middlewares/verifyToken.js");

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api", pricingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/free-trial", freeTrialRoutes);
app.use("/api/affiliate", affiliateRoutes);

// Root route
app.get("/", (req, res) => {
  const message = "It works!";
  const version = "NodeJS " + process.versions.node;
  const response = [message, version].join("\n");
  res.setHeader("Content-Type", "text/plain");
  res.send(response);
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
