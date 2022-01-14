import { Schema, model, Document } from "mongoose";

const PairActivitySchema = new Schema({
	userGoogleID: String,
	otherGoogleID: String,
	activityName: String,
	activityTime: String,
});

export interface PairActivity extends Document {
  userGoogleID: String,
	otherGoogleID: String,
	activityName: String,
	activityTime: String,
	_id: String,
}

// compile model from schema
const PairActivityModel = model<PairActivity>("PairActivity", PairActivitySchema);

export default PairActivityModel;