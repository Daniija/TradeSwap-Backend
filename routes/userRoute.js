const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router
   .route("/")
   .get(userController.getAllUsers)
   .post(userController.createUser);

router
   .route("/:id")
   .get(userController.getUserById)
   .patch(userController.updateUser)
   .delete(userController.deleteUser);

router
   .route("/parish-search/:id")
   .get(userController.finduserByParish);

router
   .route("/category-search/:id")
   .get(userController.findUserByCategory);


module.exports = router;
