const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  googleID: String,
	currentAvatarID: Number,
	currentGardenID: Number,
	currency: Number,
	userName: String,
	dateCreated: String,
	totalCurrency: Number,
});

// compile model from schema
module.exports = mongoose.model("userprofile", UserProfileSchema);
