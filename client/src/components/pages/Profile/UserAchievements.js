import React, { useEffect, useState } from "react";
import { get, post } from "../../../utilities";
import SingleAchievement from "./SingleAchievement";
import { socket } from "../../../client-socket";
import { badgeList, getStage, avatarList, gardenList, representationList } from "../../constants/constants";
import "./UserAchievements.css";
// props
// googleID
// user
// i guess i'll check on every page	
// official name
const UserAchievement = (props) => {
	const [achievements, setAchievements] = useState(undefined);
	const [achievementIDs, setAchievementIDs] = useState(undefined);

	const postAchievement = (achievementID) => {
		post("/api/userachievement", {
			googleID: props.googleID,
			achievementID: achievementID,
			achievementDate: String(new Date()),
		});
	};

	const checkAchievements0 = (achievementIDs) => { // 0, 1, 2, 3, 4
		get("/api/pairprofile", {
			userGoogleID: props.googleID,
		}).then((profiles) => {
			if (!achievementIDs.includes(0)) {
				if (profiles.length >= 5) {
					postAchievement(0);
				}
			}
			if (!achievementIDs.includes(1)) {
				if (profiles.length >= 10) {
					postAchievement(1);
				}
			}
			if (!achievementIDs.includes(2)) {
				if (profiles.length >= 20) {
					postAchievement(2);
				}
			}
			let maxStage = 0;
			for (const obj of profiles) {
				maxStage = Math.max(maxStage, getStage(obj.totalExperience));
			}
			if (!achievementIDs.includes(3)) {
				if (maxStage >= 2) {
					postAchievement(3);
				}
			}
			if (!achievementIDs.includes(4)) {
				if (maxStage >= 3) {
					postAchievement(4);
				}
			}
		});
		get("/api/userprofile", {
			googleID: props.googleID,
		}).then((profile) => {
			if (!achievementIDs.includes(9)) {
				if (props.user.name !== profile.userName) {
					postAchievement(9);
				}
			}
			if (!achievementIDs.includes(16)) {
				if (profile.totalCurrency >= 10000) {
					postAchievement(16);
				}
			}
			if (!achievementIDs.includes(17)) {
				if (profile.totalCurrency >= 20000) {
					postAchievement(17);
				}
			}
			if (!achievementIDs.includes(18)) {
				if (profile.totalCurrency >= 50000) {
					postAchievement(18);
				}
			}
		});
		get("/api/pairactivityall", {
			googleID: props.googleID,
		}).then((activities) => {
			if (!achievementIDs.includes(10)) {
				if (activities.length >= 10) {
					postAchievement(10);
				}
			}
			if (!achievementIDs.includes(11)) {
				if (activities.length >= 50) {
					postAchievement(11);
				}
			}
			const dates = [];
			for (const obj of activities) {
				if (!dates.includes(String(obj.activityTime))) {
					dates.push(String(obj.activityTime));
					if (!achievementIDs.includes(12)) {
						if (dates.length >= 7) {
							postAchievement(12);
						}
					}
					if (!achievementIDs.includes(13)) {
						if (dates.length >= 30) {
							postAchievement(13);
						}
					}
				}
			}
		});
		get("/api/useravatar", {
			googleID: props.googleID,
		}).then((avatars) => {
			if (!achievementIDs.includes(5)) {
				if (avatars.length >= 3) {
					postAchievement(5);
				}
			}
			if (!achievementIDs.includes(6)) {
				if (avatars.length === avatarList.length) {
					postAchievement(6);
				}
			}
		});
		get("/api/usergarden", {
			googleID: props.googleID,
		}).then((gardens) => {
			if (!achievementIDs.includes(7)) {
				if (gardens.length >= 3) {
					postAchievement(7);
				}
			}
			if (!achievementIDs.includes(8)) {
				if (gardens.length === gardenList.length) {
					postAchievement(8);
				}
			}
		});
		get("/api/pairrepresentationall", {
			googleID: props.googleID,
		}).then((representations) => { // we can make this more efficient but maybe later
			const lst = [];
			for (const obj of representations) {
				if (!lst.includes(obj.representationID)) {
					lst.push(obj.representationID);
					if (!achievementIDs.includes(14)) {
						if (lst.length >= 3) {
							postAchievement(14);
						}
					}
					if (!achievementIDs.includes(15)) {
						if (lst.length == representationList.length) {
							postAchievement(15);
						}
					}
				}
			}
		});
	};

	const checkAchievements = (achievementIDs) => {
		checkAchievements0(achievementIDs);
	};

	const resetAchievements = () => {
		get("/api/userachievement", {
			googleID: props.googleID
		}).then((achievementList) => {
			if (achievementList.length === 0) {
				setAchievements(
					<div className="no-achievements">
						No badges yet, explore the website more to acquire badges! (Hint: an example of how you can get a badge is by adding 5 friends!)
					</div>
				);
			} else {
				setAchievements(achievementList.map((data, index) => {
					return (
						<div key={index} className="single-achievement">
							<SingleAchievement badge={badgeList[data.achievementID]} achievementDate={data.achievementDate} />
						</div>
					);
				}));
			}
			const lst = [];
			for (const obj of achievementList) {
				lst.push(obj.achievementID);
			}
			setAchievementIDs(lst);
			checkAchievements(lst);
		});
	};

	useEffect(() => {
		socket.on("newUserAchievement", resetAchievements);
		return () => {
			socket.off("newUserAchievement", resetAchievements);
		};
	}, []);

	useEffect(() => {
		resetAchievements();
	}, []);

	return (
		<div>
			<div className="achievements-header"> BADGES </div>
			<div className="achievements">
				{achievements}
			</div>
		</div>
	);
};

export default UserAchievement;