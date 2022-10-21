const express = require("express");
const router = express.Router();
const tradesmanController = require("./../controllers/tradesmanController");

router
   .route("/")
   .get(tradesmanController.getAllTradesman)
   .get(tradesmanController.findTradesmanByCategory)
   .post(tradesmanController.createTradesman);

router
   .route("/:id")
   .get(tradesmanController.getTradesmanById)
   .patch(tradesmanController.updateTradesman)
   .delete(tradesmanController.deleteTradesman);

module.exports = router;
