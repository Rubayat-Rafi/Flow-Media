const express = require("express");
const router = express.Router();
const pseudocodeController = require("../controllers/pseudocode.controller.js");
const { validateStreamToken } = require("../utils/validateStreamToken/vaildateStreamToken.js");
router.get(`/video-stream/:id/:token`, validateStreamToken, pseudocodeController.proxy);
router.get("/streamToken/:id", pseudocodeController.streamToken);
module.exports = router;