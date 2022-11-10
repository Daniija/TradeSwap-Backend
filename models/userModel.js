const { model, Schema } = require("mongoose");

const userSchema = new Schema({
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
      required: [true, "Username must be present in order to be valid"],
      unique: [true, "This username is already registered"],
   },
   password: {
      type: String,
      required: [true, "Password must be present in order to be valid"],
   },
   parishID: { 
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "parish"
  },
});

module.exports = model("User", userSchema);
