const { model } = require("mongoose");
const UserSchema = require("../schemas/UserSchema.js");

const UserModel = model("User", UserSchema);

module.exports = UserModel;