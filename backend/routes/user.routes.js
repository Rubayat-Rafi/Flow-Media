const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.post("/signup", userController.registerUser);
router.get('/role/:email', userController.userRole);

module.exports = router;
