const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
router.use(verifyToken);
router.post("/category", categoryController.categories);
router.get("/categorys", categoryController.allCategorys);
router.delete("/delete/:id", categoryController.categoryDelete);
router.patch("/update/:id", categoryController.updateCategory);
router.get("/countdown/:id", categoryController.countDown);
router.get("/find_for_play/:id", categoryController.findForPlay);

module.exports = router;
