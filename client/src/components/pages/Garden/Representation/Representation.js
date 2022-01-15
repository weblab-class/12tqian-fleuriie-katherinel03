import React, { useEffect, useState, Component } from "react";

import "../../../../utilities.css";
import { get, post } from "../../../../utilities.js";

import RepresentationAvatar from "./RepresentationAvatar.js";
import HealthBar from "./HealthBar.js";
import RepresentationPopup from "../RepresentationPopup";

/**
 * two things
 * userGoogleID
 * otherGoogleID
 */

const MULT_FACTOR = 2;
const MINUTES_IN_DAY = 1440;
const Representation = (props) => {
	const [healthBar, setHealthBar] = useState(undefined);
	const [representationAvatar, setRepresentationAvatar] = useState(undefined);
	const [representationPopup, setRepresentationPopup] = useState(undefined);

	const getHealthBarPercentage = (goalFrequency, timeMilliseconds) => {
		const goal = goalFrequency * MINUTES_IN_DAY;
		const timeElapsed = timeMilliseconds / 1000 / 60;
		if (timeElapsed <= goal) {
			return 100;
		} else {
			const gap = MULT_FACTOR * goal;
			if (timeElapsed >= gap) {
				return 0;
			} else {
				return (1 - timeElapsed / gap) * 100;
			}
		}
		return 0;
	};
	useEffect(() => {
		get("/api/pairavatarone", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((data) => {
			setRepresentationAvatar(<RepresentationAvatar avatarName={data.representationName} width={100} />);
			get("/api/pairactivity", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
			}).then((activities) => {
				let timeElapsed;
				if (activities.length === 0) {
					setHealthBarPercentage(0);
				} else {
					const lastDate = new Date(Math.max.apply(null, activities.map((e) => {
						const date = new Date(e.activityTime);
						if (isNaN(date.getTime())) {
							return null;
						} else {
							return date;
						}
					})));
					const timeElapsed = lastDate - (new Date());
					const health = getHealthBarPercentage(data.goalFrequency, timeElapsed);
					setHealthBar(<HealthBar health={health} />);
				}
			});
		});
	}, []);
	return (
		<div>
			{healthBar}
			{representationAvatar}
			<div style={{ textAlign: "center" }}>
				<span>
					Plant
				</span>
			</div>
			
			<RepresentationPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID}/>
		</div>
	);
};

export default Representation;