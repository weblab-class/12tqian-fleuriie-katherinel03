const mongoose = require("mongoose");

// this is actually more like pair profile
// if i feel like changing it i will, but technical debt 
// representationID could be changed to currentRepresentationID, this is slightly more accurate
// okay never mind i'll actually do this

const PairProfileSchema = new mongoose.Schema({
	userGoogleID: String,
	otherGoogleID: String,
	currentRepresentationID: Number,
	totalExperience: Number,
	goalFrequency: Number,
	pairName: String,
});

// compile model from schema
module.exports = mongoose.model("pairprofile", PairProfileSchema);
