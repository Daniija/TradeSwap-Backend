const Role = require("../models/roleModel");
const { JSONResponse } = require("../utilities/jsonResponse");
const { ObjectId } = require("mongoose").Types;

class RoleController {
  static createRole = async (req, res, next) => {
     try {
        let data = req.body;
        if (Object.keys(data).length == 0)
           throw new Error("Role was not created");
        let newRole = await new Role(data).save();
        JSONResponse.success(
           res,
           "Role has been created successfully",
           newRole,
           201
        );
     } catch (error) {
        JSONResponse.error(res, "Error creating role", error, 400);
     }
  };

  static getAllRoles= async (req, res, next) => {
     try {
        let allRoles = await Role.find();
        JSONResponse.success(
           res,
           "Retrived all roles successfully",
           allRoles,
           200
        );
     } catch (error) {
        JSONResponse.error(
           res,
           "Error while retrieving roles",
           error,
           400
        );
     }
  };

  static getRoleById = async (req, res, next) => {
   try {
      let id = req.params.id;
      if (!ObjectId.isValid(id)) throw new Error("Role ID isnt valid");
      let currRole = await Role.findById(id);
      if (!currRole) throw new Error("Role not found");
      JSONResponse.success(res, "Role Retrieved", currRole, 200);
   } catch (error) {
      JSONResponse.error(res, "Unable to find role", error, 404);
   }
  };


  static updateRole = async (req, res, next) => {
     try {
        let data = req.body;
        let id = req.params.id;
        if (!ObjectId.isValid(id)) throw new Error("Invalid role");
        if (Object.keys(data).length == 0) {
           return JSONResponse.success(
              res,
              "No data has been passed, file not updated",
              {},
              200
           );
        }
        let currRole = await Role.findByIdAndUpdate({ _id: id }, data, {
           new: true,
        });
        if (!currRole) throw new Error("Role not found with that id");
        JSONResponse.success(res, "Role updated successfully", 200);
     } catch (error) {
        JSONResponse.error(res, "Unable to update role", 404);
     }
  };

  static deleteRole = async (req, res, next) => {
    try {
       let id = req.params.id;
       if (!ObjectId.isValid(id))
          throw new Error("ID does not match any role in database");
       let deletedRole = await Role.findByIdAndDelete(id);
       if (!deletedRole) throw new Error("Role does not exist with this ID");
       JSONResponse.success(res, "Successfully deleted role", deletedRole, 203);
    } catch (error) {
       JSONResponse.error(res, "Unable to delete role", error, 404);
    }
 };
}

module.exports = RoleController;