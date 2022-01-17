const mongoose = require("mongoose");

const PairRepresentationSchema = new mongoose.Schema({
  userGoogleID: String,
	otherGoogleID: String,
	representationID: Number,
});

// compile model from schema
module.exports = mongoose.model("pairrepresentation", PairRepresentationSchema);
