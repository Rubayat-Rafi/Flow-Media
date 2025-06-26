const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller.js");
router.post("/subscription", subscriptionController.subscription);

module.exports = router;
