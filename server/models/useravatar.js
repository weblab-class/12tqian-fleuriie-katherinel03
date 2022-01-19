const mongoose = require("mongoose");

const UserAvatarSchema = new mongoose.Schema({
  googleID: String,
  avatarID: Number,
});

// compile model from schema
module.exports = mongoose.model("useravatar", UserAvatarSchema);
