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
		cost: 1000,
		avatarID: 3,
	},
	{
		name: "Avatar4",
		image: avatar4,
		cost: 1000,
		avatarID: 4,
	},
	{
		name: "Avatar5",
		image: avatar5,
		cost: 1000,
		avatarID: 5,
	},
	{
		name: "Avatar6",
		image: avatar6,
		cost: 1000,
		avatarID: 6,
	},
	{
		name: "Avatar7",
		image: avatar7,
		cost: 1000,
		avatarID: 7,
	},
]

import Garden1 from "./BackgroundImages/Garden1.png";
import Garden2 from "./BackgroundImages/Garden2.png";
import Garden3 from "./BackgroundImages/Garden3.png";
import Garden4 from "./BackgroundImages/Garden4.png";
import Garden5 from "./BackgroundImages/Garden5.png";

const gardenList = [
	{
		name: "Garden1",
		image: Garden1,
		cost: 0,
		gardenID: 1,
	},
	{
		name: "Garden2",
		image: Garden2,
		cost: 200,
		gardenID: 2,
	},
	{
		name: "Garden3",
		image: Garden3,
		cost: 200,
		gardenID: 3,
	},
	{
		name: "Garden4",
		image: Garden4,
		cost: 200,
		gardenID: 4,
	},
	{
		name: "Garden5",
		image: Garden5,
		cost: 200,
		gardenID: 5,
	},
]

const EXPERIENCE_PER_ACTIVITY = 100;
const CURRENCY_PER_LEVEL = 100;
const EXPERIENCE_PER_LEVEL = 200;

const STAGE_1_LEVEL = 0;
const STAGE_2_LEVEL = 15;
const STAGE_3_LEVEL = 30;

const formatTime = (date) => {
	date = new Date(date);
	let shortMonth = date.toLocaleString('en-us', { month: 'short' }); /* Jun */
	let day = date.getUTCDate();
	let year = date.getUTCFullYear();
	return shortMonth + " " + day + ", " + year;
};

const getLevel = (experience) => {
	const rem = experience % EXPERIENCE_PER_LEVEL;	
	return (experience - rem) / EXPERIENCE_PER_LEVEL + 1;
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
	avatarList,
	EXPERIENCE_PER_ACTIVITY,
	CURRENCY_PER_LEVEL,
	EXPERIENCE_PER_LEVEL,
	formatTime,
	STAGE_1_LEVEL,
	STAGE_2_LEVEL,
	STAGE_3_LEVEL,
	getLevel,
	getStage,
	MULT_FACTOR,
	MINUTES_IN_DAY
};