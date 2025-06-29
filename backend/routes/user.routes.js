const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.post("/signup", userController.registerUser);
router.get("/role/:email", userController.userRole);
router.get("/:email", userController.allUserData);
router.patch("/role/:id", userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
