const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router
   .route("/")
   .get(CategoryController.getAllCategory)
   .post(CategoryController.createCategory);

router
   .route("/:id")
   .get(CategoryController.getCategoryById)
   .patch(CategoryController.updateCategory)
   .delete(CategoryController.deleteCategory);

module.exports = router;
