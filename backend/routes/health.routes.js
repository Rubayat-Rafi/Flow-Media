const express = require("express");
const router = express.Router();
const healthController = require("../controllers/health.controller.js");
router.post("/health", healthController.health);


module.exports = router;
