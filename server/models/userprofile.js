const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  googleID: String,
	currentAvatar: String,
	currency: Number,
});

// compile model from schema
module.exports = mongoose.model("userprofile", UserProfileSchema);