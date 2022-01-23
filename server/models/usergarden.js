const mongoose = require("mongoose");

const UserGardenSchema = new mongoose.Schema({
  googleID: String,
  gardenID: Number,
});

// compile model from schema
module.exports = mongoose.model("usergarden", UserGardenSchema);
