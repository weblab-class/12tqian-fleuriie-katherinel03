import React, { useEffect, useState } from "react";
import { get, post } from "../../../utilities";
import SingleAchievement from "./SingleAchievement";
import { socket } from "../../../client-socket";
import { badgeList, getStage } from "../../constants/constants";
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
	};

	const checkAchievements = (achievementIDs) => {
		checkAchievements0(achievementIDs);
	};

	const resetAchievements = () => {
		get("/api/userachievement", {
			googleID: props.googleID
		}).then((achievementList) => {
			setAchievements(achievementList.map((data, index) => {
				return (
					<div key={index} className="single-achievement">
						<SingleAchievement badge={badgeList[data.achievementID]} achievementDate={data.achievementDate} />
					</div>
				);
			}));
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
			<div className="achievements-header"> Achievements </div>
			<div className="achievements">
				{achievements}
			</div>
		</div>

	);
};

export default UserAchievement;