const { model, Schema } = require("mongoose");

const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const authSchema = new Schema({
   first_name: {
      type: String,
      required: [true, "No first name was provided"],
   },
   last_name: {
      type: String,
      required: [true, "No last name was provided"],
   },
   username: {
      type: String,
      required: true,
      unique: [true, "Username already exist in the database"],
   },
   email: {
      type: String,
      required:[true],
      unique: [true, "Email already exist in the database"],
   },
   password: {
      type: String,
      required: [true, "Password was not provided"],
   },
   phone_number:{
      type:String,
      required: [true],
   },
   work_rate: {
      type:String,
   },
   roleID:{
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "roles"
   },
   categoryID: {
      type: Schema.Types.ObjectId,
      ref: "category",
   },
   parishID: { 
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "parish"
   },
   isAdmin: {
      type: Boolean,
      default: false,
   }, 
});

// Middleware function to execute and hash password before saving user into the database.

authSchema.pre("save", async function () {
   try {
      // created a check to make sure user account exist
      let account = await User.find({ username: this.username });
      if (!account)
         return Promise.reject(new Error("No data found for this username"));
      this.password = await bcrypt.hash(this.password, 10);
      this.isSuperAdmin = false;
   } catch (error) {
      return Promise.reject(new Error(error.message));
   }
});
// Instance method to compare a password with the encrypted password.
authSchema.methods.isCorrectPassword = async function (password) {
   let isCorrect = await bcrypt.compare(password, this.password);
   return isCorrect;
};
module.exports = model("Auth", authSchema);
