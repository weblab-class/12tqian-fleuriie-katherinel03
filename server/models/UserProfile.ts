import { Schema, model, Document } from "mongoose";

const UserProfileSchema = new Schema({
	googleID: String,
	currentAvatar: String,
	currency: Number,
});

export interface UserProfile extends Document {
	googleID: String,
	currentAvatar: String,
	currency: Number,
	_id: String,
};

const UserProfileModel = model<UserProfile>("UserProfile", UserProfileSchema);

export default UserProfileModel;