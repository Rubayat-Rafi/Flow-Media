const express = require("express");
const router = express.Router();
const trialController = require("../controllers/freeTrial.controller.js");
router.get("/check",trialController.checkStatus );
router.post("/start",trialController.traialStart );


module.exports = router;