const mongoose = require("mongoose");

const UserAchievementSchema = new mongoose.Schema({
	googleID: String,
	achievementID: Number,
	achievementDate: String,
});

// compile model from schema
module.exports = mongoose.model("userachievement", UserAchievementSchema);
