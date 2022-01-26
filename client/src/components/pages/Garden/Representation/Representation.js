import React, { useEffect, useState, Component } from "react";

import "../../../../utilities.css";
import { get, post } from "../../../../utilities.js";

import RepresentationAvatar from "./RepresentationAvatar.js";
import RepresentationAvatarLevel from "../RepresentationAvatarLevel";
import HealthBar from "./HealthBar.js";
import RepresentationPopup from "../RepresentationPopup";
import { socket } from "../../../../client-socket";
import "./Representation.css"
import EditPairName from "./EditPairName";

import { getStage, MULT_FACTOR, MINUTES_IN_DAY } from "../../../constants/constants";

const Representation = (props) => {
	const [healthBar, setHealthBar] = useState(undefined);
	const [representationAvatarLevel, setRepresentationAvatarLevel] = useState(undefined);
	const [otherName, setOtherName] = useState(undefined);

	const getHealthBarPercentage = (goalFrequency, timeMilliseconds) => {
		const goal = goalFrequency * MINUTES_IN_DAY;
		let timeElapsed = timeMilliseconds / 1000 / 60;
		timeElapsed = Math.max(timeElapsed, 0);
		const gap = MULT_FACTOR * goal;
		return Math.max(0, (1 - timeElapsed / gap)) * 100;
		// if (timeElapsed <= goal) {
		// 	return 100;
		// } else {
		// 	const gap = MULT_FACTOR * goal;
		// 	if (timeElapsed >= gap) {
		// 		return 0;
		// 	} else {
		// 		return (1 - timeElapsed / gap) * 100;
		// 	}
		// }
	};

	const setRepresentation = () => {
		get("/api/pairprofileone", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((pairProfile) => {
			setRepresentationAvatarLevel(
				<RepresentationAvatarLevel
					representationAvatar={
						<RepresentationAvatar
							representationID={pairProfile.currentRepresentationID}
							width={"100%"}
							stage={getStage(pairProfile.totalExperience)}
						/>
					}
					totalExperience={pairProfile.totalExperience}
				/>
			);
			setOtherName(pairProfile.pairName);
			get("/api/pairactivity", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
			}).then((activities) => {
				let lastDate;
				if (activities.length === 0) {
					lastDate = new Date();
				} else {
					lastDate = new Date(Math.max.apply(null, activities.map((e) => {
						const date = new Date(e.activityTime);
						if (isNaN(date.getTime())) {
							return null;
						} else {
							return date;
						}
					})));
				}
				const timeElapsed = lastDate - (new Date());
				const health = getHealthBarPercentage(pairProfile.goalFrequency, timeElapsed);
				setHealthBar(<HealthBar health={health} />);
			});
		});
	};

	useEffect(() => {
		setRepresentation();
	}, []);

	useEffect(() => {
		socket.on("newPairProfileUpdate", setRepresentation);
		return () => {
			socket.off("newPairProfileUpdate", setRepresentation);
		};
	}, []);

	return (
		<div className="representation-container">
			<div className="centeredDiv">
				<div className="healthBarWithinDiv">
					{healthBar}
				</div>
				{representationAvatarLevel}
			</div>
			<div style={{ textalign: "center" }}>
			</div>
			<RepresentationPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} otherName={otherName} />
		</div>
	);
};

export default Representation;