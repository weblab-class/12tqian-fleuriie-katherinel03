import React, { useEffect, useState } from "react";

import "./UserStats.css";

import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import { formatTime } from "../../constants/constants";

import { socket } from "../../../client-socket";

import SingleStat from "./SingleStat";

// props
// googleID
// that's really all we need...
// this can all be done here cause otherwise it's fine
// 

const UserStats = (props) => {

	const [dateCreated, setDateCreated] = useState(undefined); // reset with user api
	const [totalCurrency, setTotalCurrency] = useState(undefined);
	const [totalExperience, setTotalExperience] = useState(undefined); // reset with activities
	const [totalFriends, setTotalFriends] = useState(undefined);
	const [totalActivities, setTotalActivities] = useState(undefined); // reset with activities
	const [totalAvatars, setTotalAvatars] = useState(undefined);
	const [totalAchievements, setTotalAchievements] = useState(undefined); // reset with achievements
	const [totalBackgrounds, setTotalBackgrounds] = useState(undefined); // reset with garden
	const [totalRepresentations, setTotalRepresentations] = useState(undefined); // reset with representation

	const resetUserProfileStats = () => {
		get("/api/userprofile", {
			googleID: props.googleID,
		}).then((profile) => {
			setDateCreated(<SingleStat text={"Date created: "} stat={formatTime(new Date(profile.dateCreated))} />);
			setTotalCurrency(<SingleStat text={"Total currency accumulated: "} stat={profile.totalCurrency} />);
		});
	};

	const resetRepresentationStats = () => {
		get("/api/pairrepresentationall", {
			userGoogleID: props.googleID,
		}).then((representations) => {
			setTotalRepresentations(<SingleStat text={"Plants owned: "} stat={representations.length} />);
		});
	};

	const resetBackgroundStats = () => {
		get("/api/usergarden", {
			googleID: props.googleID,
		}).then((gardens) => {
			setTotalBackgrounds(<SingleStat text={"Backgrounds owned: "} stat={gardens.length} />);
		});
	};

	const resetAchievementStats = () => {
		get("/api/userachievement", {
			googleID: props.googleID,
		}).then((achievements) => {
			setTotalAchievements(<SingleStat text={"Achievements obtained: "} stat={achievements.length} />);
		});
	};

	const resetActivityStats = () => {
		get("/api/pairactivityall", {
			googleID: props.googleID,
		}).then((activities) => {
			setTotalActivities(<SingleStat text={"Total activities: "} stat={activities.length} />);
		});
	};	

	const resetPairProfileStats = () => {
		get("/api/pairprofile", {
			userGoogleID: props.googleID,
		}).then((profiles) => {
			setTotalFriends(<SingleStat text={"Friend count: "} stat={profiles.length} />);
			let experience = 0;
			for (const obj of profiles) {
				experience = experience + obj.totalExperience;
			}
			setTotalExperience(<SingleStat text={"Total experience: "} stat={experience} />);
		});
	};

	const resetUserAvatarStats = () => {
		get("/api/useravatar", {
			googleID: props.googleID,
		}).then((avatars) => {
			setTotalAvatars(<SingleStat text={"Avatars owned: "} stat={avatars.length} />);
		});
	};

	useEffect(() => {
		resetUserProfileStats();
		resetActivityStats();
		resetPairProfileStats();
		resetUserAvatarStats();
		resetBackgroundStats();
		resetAchievementStats();
		resetRepresentationStats();
	}, [props.googleID]);

	useEffect(() => {
		socket.on("newUserAchievement", resetAchievementStats);
		return () => {
			socket.off("newUserAchievement", resetAchievementStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newPairActivity", resetActivityStats);
		return () => {
			socket.off("newPairActivity", resetActivityStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newUserGarden", resetBackgroundStats);
		return () => {
			socket.off("newUserGarden", resetBackgroundStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newPairProfileUpdate", resetPairProfileStats);
		return () => {
			socket.off("newPairProfileUpdate", resetPairProfileStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newUserProfileUpdate", resetUserProfileStats);
		return () => {
			socket.off("newUserProfileUpdate", resetUserProfileStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newUserAvatarUpdate", resetUserAvatarStats);
		return () => {
			socket.off("newUserAvatarUpdate", resetUserAvatarStats);
		};
	}, []);

	useEffect(() => {
		socket.on("newPairRepresentationUpdate", resetRepresentationStats);
		return () => {
			socket.off("newPairRepresentationUpdate", resetRepresentationStats);
		};
	});

	return (
		<div>
			<div className="stats-header"> STATS </div>
			<div className="stats">
				{dateCreated}
				{totalCurrency}
				{totalFriends}
				{totalActivities}
				{totalExperience}
				{totalAvatars}
				{totalBackgrounds}
				{totalAchievements}
				{totalRepresentations}
			</div>
		</div>
	);
}

export default UserStats;