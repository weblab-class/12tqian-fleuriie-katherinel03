import representation0_1 from "./RepresentationAvatarImages/Representation0_Stage1.png";
import representation0_2 from "./RepresentationAvatarImages/Representation0_Stage2.png";
import representation0_3 from "./RepresentationAvatarImages/Representation0_Stage3.png";
import representation1_1 from "./RepresentationAvatarImages/Representation1_Stage1.png";
import representation1_2 from "./RepresentationAvatarImages/Representation1_Stage2.png";
import representation1_3 from "./RepresentationAvatarImages/Representation1_Stage3.png";
import representation2_1 from "./RepresentationAvatarImages/Representation2_Stage1.png";
import representation2_2 from "./RepresentationAvatarImages/Representation2_Stage2.png";
import representation2_3 from "./RepresentationAvatarImages/Representation2_Stage3.png";
import representation3_1 from "./RepresentationAvatarImages/Representation3_Stage1.png";
import representation3_2 from "./RepresentationAvatarImages/Representation3_Stage2.png";
import representation3_3 from "./RepresentationAvatarImages/Representation3_Stage3.png";
import representation4_1 from "./RepresentationAvatarImages/Representation4_Stage1.png";
import representation4_2 from "./RepresentationAvatarImages/Representation4_Stage2.png";
import representation4_3 from "./RepresentationAvatarImages/Representation4_Stage3.png";
import representation5_1 from "./RepresentationAvatarImages/Representation5_Stage1.png";
import representation5_2 from "./RepresentationAvatarImages/Representation5_Stage2.png";
import representation5_3 from "./RepresentationAvatarImages/Representation5_Stage3.png";
import representation6_1 from "./RepresentationAvatarImages/Representation6_Stage1.png";
import representation6_2 from "./RepresentationAvatarImages/Representation6_Stage2.png";
import representation6_3 from "./RepresentationAvatarImages/Representation6_Stage3.png";
import representation7_1 from "./RepresentationAvatarImages/Representation7_Stage1.png";
import representation7_2 from "./RepresentationAvatarImages/Representation7_Stage2.png";
import representation7_3 from "./RepresentationAvatarImages/Representation7_Stage3.png";

const representationList = [
	{
		name: "Representation0",
		cost: 0,
		representationID: 0,
		images: [
			representation0_1,
			representation0_2,
			representation0_3,
		],
	},
	{
		name: "Representation1",
		cost: 10,
		representationID: 1,
		images: [
			representation1_1,
			representation1_2,
			representation1_3,
		],
	},
	{
		name: "Representation2",
		cost: 20,
		representationID: 2,
		images: [
			representation2_1,
			representation2_2,
			representation2_3,
		],
	},
	{
		name: "Representation3",
		cost: 30,
		representationID: 3,
		images: [
			representation3_1,
			representation3_2,
			representation3_3,
		],
	},
	{
		name: "Representation4",
		cost: 40,
		representationID: 4,
		images: [
			representation4_1,
			representation4_2,
			representation4_3,
		],
	},
	{
		name: "Representation5",
		cost: 50,
		representationID: 5,
		images: [
			representation5_1,
			representation5_2,
			representation5_3,
		],
	},
	{
		name: "Representation6",
		cost: 60,
		representationID: 6,
		images: [
			representation6_1,
			representation6_2,
			representation6_3,
		],
	},
	{
		name: "Representation7",
		cost: 70,
		representationID: 7,
		images: [
			representation7_1,
			representation7_2,
			representation7_3,
		],
	},
];

import avatar0 from "./Avatars/Avatar0.png";
import avatar1 from "./Avatars/Avatar1.png";
import avatar2 from "./Avatars/Avatar2.png";
import avatar3 from "./Avatars/Avatar3.png";
import avatar4 from "./Avatars/Avatar4.png";
import avatar5 from "./Avatars/Avatar5.png";
import avatar6 from "./Avatars/Avatar6.png";
import avatar7 from "./Avatars/Avatar7.png";

const avatarList = [
	{
		name: "Avatar0",
		image: avatar0,
		cost: 0,
		avatarID: 0,
	},
	{
		name: "Avatar1",
		image: avatar1,
		cost: 500,
		avatarID: 1,
	},
	{
		name: "Avatar2",
		image: avatar2,
		cost: 1000,
		avatarID: 2,
	},
	{
		name: "Avatar3",
		image: avatar3,
		cost: 2000,
		avatarID: 3,
	},
	{
		name: "Avatar4",
		image: avatar4,
		cost: 2000,
		avatarID: 4,
	},
	{
		name: "Avatar5",
		image: avatar5,
		cost: 10000,
		avatarID: 5,
	},
	{
		name: "Avatar6",
		image: avatar6,
		cost: 10000,
		avatarID: 6,
	},
	{
		name: "Avatar7",
		image: avatar7,
		cost: 20000,
		avatarID: 7,
	},
]
// 5 to 8 and 14, 15 are sketch
import badge0 from "./Badges/Badge0.png";
import badge1 from "./Badges/Badge1.png";
import badge2 from "./Badges/Badge2.png";
import badge3 from "./Badges/Badge3.png";
import badge4 from "./Badges/Badge4.png";
import badge5 from "./Badges/Badge0.png";
import badge6 from "./Badges/Badge0.png";
import badge7 from "./Badges/Badge0.png";
import badge8 from "./Badges/Badge0.png";
import badge9 from "./Badges/Badge9.png";
import badge10 from "./Badges/Badge10.png";
import badge11 from "./Badges/Badge11.png";
import badge12 from "./Badges/Badge12.png";
import badge13 from "./Badges/Badge13.png";
import badge14 from "./Badges/Badge0.png";
import badge15 from "./Badges/Badge0.png";
import badge16 from "./Badges/Badge16.png";
import badge17 from "./Badges/Badge17.png";
import badge18 from "./Badges/Badge18.png";
import badge19 from "./Badges/Badge19.png";
import badge20 from "./Badges/Badge20.png";

const badgeList = [
	{
		name: "Buddies",
		description: "Added 5 friends",
		image: badge0,
		badgeID: 0,
	},
	{
		name: "Social Butterfly",
		description: "Added 10 friends",
		image: badge1,
		badgeID: 1,
	},
	{
		name: "Wow So Popular",
		description: "Added 20 friends",
		image: badge2,
		badgeID: 2,
	},
	{
		name: "Green Thumb",
		description: "Unlocked 2nd stage of a plant",
		image: badge3,
		badgeID: 3,
	},
	{
		name: "Greener Thumb",
		description: "Unlocked 3rd stage of a plant",
		image: badge4,
		badgeID: 4,
	},
	{
		name: "sus5",
		description: "Purchased 3 avatars",
		image: badge5,
		badgeID: 5,
	},
	{
		name: "sus6",
		description: "Purchased all avatars",
		image: badge6,
		badgeID: 6,
	},
	{
		name: "sus7",
		description: "Purchased 3 garden backgrounds",
		image: badge7,
		badgeID: 7,
	},
	{
		name: "sus8",
		description: "Purchased all garden backgrounds",
		image: badge8,
		badgeID: 8,
	},
	{
		name: "New Identity",
		description: "Edit your profile",
		image: badge9,
		badgeID: 9,
	},
	{
		name: "Journalist",
		description: "Logged 10 activities",
		image: badge10,
		badgeID: 10,
	},
	{
		name: "Expert Journalist",
		description: "Logged 50 activities",
		image: badge11,
		badgeID: 11,
	},
	{
		name: "Commited",
		description: "Log activities for 7 days",
		image: badge12,
		badgeID: 12,
	},
	{
		name: "Still Here?",
		description: "Log activities for 30 days",
		image: badge13,
		badgeID: 13,
	},
	{
		name: "Botanist",
		description: "Purchased 3 different types of plants",
		image: badge14,
		badgeID: 14,
	},
	{
		name: "Horticulturist",
		description: "Purchased all types of plants",
		image: badge15,
		badgeID: 15,
	},
	{
		name: "Rich",
		description: "Gained 10,000 in currency",
		image: badge16,
		badgeID: 16,
	},
	{
		name: "Richer",
		description: "Gained 20,000 in currency",
		image: badge17,
		badgeID: 17,
	},
	{
		name: "Richest",
		description: "Gained 50,000 in currency",
		image: badge18,
		badgeID: 18,
	},
	{
		name: "Bye!",
		description: "Deleted a friend",
		image: badge19,
		badgeID: 19,
	},
	{
		name: "Secret Achievement",
		description: "Added friends called annie, timmy, kat",
		image: badge20,
		badgeID: 20,
	},
];

import garden0 from "./BackgroundImages/Garden0.png";
import garden1 from "./BackgroundImages/Garden1.png";
import garden2 from "./BackgroundImages/Garden2.png";
import garden3 from "./BackgroundImages/Garden3.png";
import garden4 from "./BackgroundImages/Garden4.png";
import garden5 from "./BackgroundImages/Garden5.png";
import garden6 from "./BackgroundImages/Garden6.png";
import garden7 from "./BackgroundImages/Garden7.png";

const gardenList = [
	{
		name: "Garden0",
		image: garden0,
		cost: 0,
		gardenID: 0,
	},
	{
		name: "Garden1",
		image: garden1,
		cost: 2000,
		gardenID: 1,
	},
	{
		name: "Garden2",
		image: garden2,
		cost: 2000,
		gardenID: 2,
	},
	{
		name: "Garden3",
		image: garden3,
		cost: 2000,
		gardenID: 3,
	},
	{
		name: "Garden4",
		image: garden4,
		cost: 2000,
		gardenID: 4,
	},
	{
		name: "Garden5",
		image: garden5,
		cost: 2000,
		gardenID: 5,
	},
	{
		name: "Garden6",
		image: garden6,
		cost: 2000,
		gardenID: 6,
	},
	{
		name: "Garden7",
		image: garden7,
		cost: 2000,
		gardenID: 7,
	},
];

const EXPERIENCE_PER_ACTIVITY = 100;
const CURRENCY_PER_LEVEL = 100;
const EXPERIENCE_PER_LEVEL = 500;
const CURRENCY_LEVEL_MULTIPLIER = 2;
const EXPERIENCE_LEVEL_MULTIPLIER = 2;

const MULTIPLIER_LOW = 0.9;
const MULTIPLIER_HIGH = 1.1;

const STAGE_1_LEVEL = 0;
const STAGE_2_LEVEL = 5;
const STAGE_3_LEVEL = 10;

const formatTime = (date) => {
	date = new Date(date);
	let shortMonth = date.toLocaleString('en-us', { timeZone: 'America/New_York', month: 'short' }); /* Jun */
	let day = date.toLocaleString('en-us', { timeZone: 'America/New_York', day: 'numeric' });
	let year = date.toLocaleString('en-us', { timeZone: 'America/New_York', year: 'numeric' });
	return shortMonth + " " + day + ", " + year;
};

const CONSTANT_A = 1000;
const CONSTANT_B = 100;

const getTotalExperience = (level) => { // how much experience to be at level 
	return Math.round(CONSTANT_A * level + Math.pow(level, 1.5) * CONSTANT_B);
};

const getLevel = (experience) => {
	let level = 0;
	while (experience >= getTotalExperience(level)) {
		level = level + 1;
	}
	return level - 1;
};

const getRemainder = (experience) => {
	return experience - getTotalExperience(getLevel(experience));
};

const getToNextLevel = (experience) => {
	return getTotalExperience(getLevel(experience) + 1) - getTotalExperience(getLevel(experience));
};

const getStage = (experience) => {
	const level = getLevel(experience);
	if (level >= STAGE_3_LEVEL) {
		return 3;
	} else if (level >= STAGE_2_LEVEL) {
		return 2;
	} else {
		return 1;
	}
};

const MULT_FACTOR = 2;
const MINUTES_IN_DAY = 1440;

export {
	representationList,
	badgeList,
	avatarList,
	EXPERIENCE_PER_ACTIVITY,
	CURRENCY_PER_LEVEL,
	EXPERIENCE_PER_LEVEL,
	EXPERIENCE_LEVEL_MULTIPLIER,
	CURRENCY_LEVEL_MULTIPLIER,
	formatTime,
	STAGE_1_LEVEL,
	STAGE_2_LEVEL,
	STAGE_3_LEVEL,
	getLevel,
	getRemainder,
	getToNextLevel,
	getStage,
	MULT_FACTOR,
	MINUTES_IN_DAY,
	MULTIPLIER_LOW,
	MULTIPLIER_HIGH,
	gardenList,
};