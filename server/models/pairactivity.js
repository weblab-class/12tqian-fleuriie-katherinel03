const mongoose = require("mongoose");

const PairActivitySchema = new mongoose.Schema({
	userGoogleID: String,
	otherGoogleID: String,
	activityName: String,
	activityTime: String,
});

// compile model from schema
module.exports = mongoose.model("pairactivity", PairActivitySchema);
