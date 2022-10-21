const Tradesman = require("../models/tradesmanModel");
const { JSONResponse } = require("../utilities/jsonResponse");

class TradesmanController{

    static createTradesman = async (req, res, next) => {
        try {
           let data = req.body;
           if (Object.keys(data).length == 0)
              throw new Error("No data was passed to create trademan");
           let tradesman = await new Tradesman(data).save();
           tradesman.password = undefined;
           JSONResponse.success(
              res,
              "Trademan's profile successfully created",
              tradesman,
              201
           );
        } catch (error) {
           JSONResponse.error(res, "Error creating tradesman profile", error, 400);
        }
    };

    static getAllTradesman = async (req, res, next) => {
        try {
           let tradesman = await Tradesman.find().populate("categoryID");
           JSONResponse.success(
              res,
              "Successfully retrieved all tradesmen",
              tradesman,
              201
           );
        } catch (error) {
           JSONResponse.error(res, "Error retrieving tradesmen", error, 404);
        }
    };

    static getTradesmanById = async (req, res, next) => {
        try {
           let id = req.params.id;
           if (!ObjectId.isValid(id))
              throw new Error("Id is not a valid tradesman profile in database");
           let tradesman = await Tradesman.findById(id);
           if (!tradesman) throw new Error("tradesman not found with this id");
           tradesman.password = undefined;
           JSONResponse.success(res, "Retrieved tradesman info", user, 200);
        } catch (error) {
           JSONResponse.error(res, "Unable to find tradesman", error, 404);
        }
    };

    static updateTradesman = async (req, res, next) => {
        try {
           let data = req.body;
           let id = req.params.id;
           if (!ObjectId.isValid(id))
              throw new Error("Invalid ID was passed as a parameter");
           if (Object.keys(data).length == 0) {
              return JSONResponse.success(
                 res,
                 "No data passed, file not updated",
                 {},
                 200
              );
           }
           let tradesman = await Tradesman.findOneAndUpdate({ _id: id }, data, {
              new: true,
           });
           if (!tradesman) throw new Error("Tradesman not found with the ID");
           JSONResponse.success(res, "Tradesman updated successfully", user, 200);
        } catch (error) {
           JSONResponse.error(res, "Unable to update tradesman", error, 404);
        }
    };

    static deleteTradesman = async (req, res, next) => {
        try {
           let id = req.params.id;
           if (!ObjectId.isValid(id))
              throw new Error("ID does not match any tradesman in database");
           let tradesman = await Tradesman.findByIdAndDelete(id);
           if (!tradesman) throw new Error("Tradesman does not exist with this ID");
           JSONResponse.success(res, "Successfully deleted tradesman", user, 203);
        } catch (error) {
           JSONResponse.error(res, "Unable to delete tradesman", error, 404);
        }
    };

    static findTradesmanByCategory = async (req, res, next) => {
        try {
           let tradesman = await Tradesman.find({ categoryID: req.params.id }).populate("categoryID");
           JSONResponse.success(
              res,
              "This category is empty",
              tradesman,
              201
           );
        } catch (error) {
           JSONResponse.error(res, "Error, unable to category", error, 400);
        }
    };
}

module.exports = TradesmanController;