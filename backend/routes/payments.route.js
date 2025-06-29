const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/payments.controller.js");

router.post("/payments", paymentsController.payments);
router.post("/create-payment-intent", paymentsController.paymentIntendSystem);

module.exports = router;
