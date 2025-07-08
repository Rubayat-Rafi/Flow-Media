const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricing.controller.js");

router.post("/add-pricing", pricingController.addPricing);

module.exports = router;
