import representation0 from "./RepresentationAvatarImages/Representation0.png";
import representation1 from "./RepresentationAvatarImages/Representation1.png";
import representation2 from "./RepresentationAvatarImages/Representation2.png";


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

// const representationList = [
// 	{
// 		name: "Representation0",
// 		image: representation0,
// 		cost: 0,
// 		representationID: 0,
// 	},
// 	{
// 		name: "Representation1",
// 		image: representation1,
// 		cost: 0,
// 		representationID: 1,
// 	},
// 	{
// 		name: "Representation2",
// 		image: representation2,
// 		cost: 1000,
// 		representationID: 2,
// 	},
// ];

import avatar0 from "./Avatars/Avatar0.png";
import avatar1 from "./Avatars/Avatar1.png";
import avatar2 from "./Avatars/Avatar2.png";

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
]

export { representationList, avatarList };