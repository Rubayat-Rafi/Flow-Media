const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/payments.controller.js");

router.post("/payments", paymentsController.payments);
router.post("/create-payment-intent", paymentsController.paymentIntendSystem);
router.get("/subscriptions/expired/:email", paymentsController.expiredSubscription);
router.post("/add_devices", paymentsController.addDeveiceEmail);
router.post("/cancel_devices", paymentsController.cancelDeviceEmail);

module.exports = router;
