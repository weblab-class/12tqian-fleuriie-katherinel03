import { Schema, model, Document } from "mongoose";

const UserAchievementSchema = new Schema({
	googleID: String,
	achivementName: String,
});

export interface UserAchievement extends Document {
	googleID: String,
	achivementName: String,
	_id: String,
};

const UserAchievementModel = model<UserAchievement>("UserAchievement", UserAchievementSchema);

export default UserAchievementModel;