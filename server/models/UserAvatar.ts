import { Schema, model, Document } from "mongoose";

const UserAvatarSchema = new Schema({
	googleID: String,
	avatarNames: [String],
});

export interface UserAvatar extends Document {
	googleID: String,
	avatarNames: [String],
	_id: String,
};

const UserAvatarModel = model<UserAvatar>("UserAvatar", UserAvatarSchema);

export default UserAvatarModel;