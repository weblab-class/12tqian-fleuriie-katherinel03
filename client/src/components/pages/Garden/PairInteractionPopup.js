import React, { useEffect, useState, Component } from "react";

import { get, post } from "../../../utilities.js";
import Avatar from "../Avatar/Avatar.js";

const PairInteractionPopup = (props) => {
	const [userAvatar, setUserAvatar] = useState(undefined);
	const [otherAvatar, setOtherAvatar] = useState(undefined);
	const [activities, setActivities] = useState([]);
	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setUserAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
		});
		get("/api/userprofile", {
			googleID: props.otherGoogleID,
		}).then((profile) => {
			setOtherAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
		});
		get("/api/pairactivity", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((activityList) => {
			setActivities(activityList);
		});
	}, []);
	console.log(activities);
	console.log("MONKA");
	const activityObjects = activities.map((activity, index) => {
		return (
			<div>

				<span>
					asdfasdf
				</span>
				<div key={index}>
					idk man i just want to be done
				</div>
			</div>
		);
	});
	console.log(activityObjects);
	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
				<div>
					{userAvatar}
				</div>
				<div>
					<span>{props.userGoogleID + " & " + props.otherGoogleID}</span>
					{/* to do add something that would add a new activity */}
					<div>
						asdfhasdifhadspf
					</div>
					{activityObjects}
				</div>
				<div>
					{otherAvatar}
				</div>
			</div>

		</div>
	);
};

export default PairInteractionPopup;