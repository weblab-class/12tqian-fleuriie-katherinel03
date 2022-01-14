import { Schema, model, Document } from "mongoose";

const PairAvatarSchema = new Schema({
	userGoogleID: String,
	otherGoogleID: String,
	representationName: String,
	totalExperience: Number,
	goalFrequency: Number,
});

export interface PairAvatar extends Document {
	userGoogleID: String,
	otherGoogleID: String,
	representationName: String,
	totalExperience: Number,
	goalFrequency: Number,
	_id: String,
}

// compile model from schema
const PairAvatarModel = model<PairAvatar>("PairAvatar", PairAvatarSchema);

export default PairAvatarModel;