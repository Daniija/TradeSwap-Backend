const express = require('express');
const router = express.router();
const CategoryController = require("../controllers/categoryController");

router
    .route('/')
    .get(userController.getAllCategory)
    .post(userController.createCategory);

    router
    .route("/:id")
    .get(userController.getCategoryById)
    .patch(userController.updateCategory)
    .delete(userController.deleteCategory);

module.exports = router;
