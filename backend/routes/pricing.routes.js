const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricing.controller.js");

router.post("/add-pricing", pricingController.addPricing);
router.get("/pricing", pricingController.allPricing);
router.delete("/pricing/delete/:id", pricingController.deletePricing);
router.patch("/update/pricing/:id", pricingController.updatePricing);

module.exports = router;
