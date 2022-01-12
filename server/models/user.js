const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleID: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
