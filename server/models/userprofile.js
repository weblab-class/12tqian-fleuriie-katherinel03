const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  googleID: String,
	currentAvatarID: Number,
	currentGardenID: Number,
	currency: Number,
	userName: String,
});

// compile model from schema
module.exports = mongoose.model("userprofile", UserProfileSchema);
