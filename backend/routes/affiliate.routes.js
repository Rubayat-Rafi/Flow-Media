const express = require("express");
const router = express.Router();
const affiliateController = require("../controllers/affiliate.controller.js");

router.post("/apply_form", affiliateController.affiliate);
router.get("/my_affiliate/:id", affiliateController.myAffiliate);
router.patch("/action/:id", affiliateController.affiliateAction);

module.exports = router;
