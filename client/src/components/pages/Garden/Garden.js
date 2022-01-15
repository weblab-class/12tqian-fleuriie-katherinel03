import React, { Component, useEffect } from "react";

import "../../../utilities.css";

import { get, post } from "../../../utilities.js";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

import Representation from "./Representation/Representation.js";

import NewActivityPopup from "./Representation/NewActivityPopup";

const handleDragStart = (e) => e.preventDefault();

const carouselItems = [];

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 5 },
};

const Garden = (props) => {
	post("/api/pairactivity", {
		userGoogleID: "user1",
		otherGoogleID: "user2",
		activityName: "league",
		activityTime: new Date(),
	});
	post("/api/pairactivity", {
		userGoogleID: "user1",
		otherGoogleID: "user2",
		activityName: "died",
		activityTime: new Date(),
	});
	get("/api/pairactivity", {
		userGoogleID: "user1",
		otherGoogleID: "user2"
	}).then((data) => {
		console.log(data);
	});
	post("/api/pairavatar", {
		userGoogleID: "user1",
		otherGoogleID: "user2",
		representationName: "Representation",
		totalExperience: 0,
		goalFrequency: 100,
	}).then((activity) => {
		console.log(activity);
	});
	useEffect(() => {
		get("/api/pairavatar", {
			userGoogleID: "user1",
		}).then((pairAvatars) => {
			for (const avatar of pairAvatars) {
				carouselItems.push(
					<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
						<Representation userGoogleID={avatar.userGoogleID} otherGoogleID={avatar.otherGoogleID} />
					</span>
				);
			}
		});
	}, []);
	return (
		<div>
			<NewActivityPopup userGoogleID={"user1"} otherGoogleID={"user2"}/>
			<AliceCarousel
				mouseTracking items={carouselItems}
				keyboardNavigation={true}
				infinite={true}
				controlsStrategy="alternate"
				responsive={responsive}
				disableDotsControls={true}
				animationDuration={140}
			/>
		</div>
	);
};

export default Garden;