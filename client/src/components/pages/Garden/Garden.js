import React, { Component, useEffect, useState } from "react";

import "../../../utilities.css";

import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

import Representation from "./Representation/Representation.js";
import NewPairPopup from "./NewPairPopup";

import RepresentationChangePopup from "./RepresentationChangePopup";


const handleDragStart = (e) => e.preventDefault();

const carouselItems = [];

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 5 },
};

const Garden = (props) => {
	const [user, setUser] = useState(undefined);
	const [pairProfiles, setPairProfiles] = useState([]);
	const [carouselItems, setCarouselItems] = useState([]);

	useEffect(() => {
		get("/api/whoami",).then((curUser) => {
			if (curUser._id) {
				setUser(curUser);
			}
		});
	}, []);

	const resetCarousel = (profileList) => {
		const newCarouselItems = [];
		for (const profile of profileList) {
			newCarouselItems.push(
				<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
					<Representation userGoogleID={profile.userGoogleID} otherGoogleID={profile.otherGoogleID} />
				</span>
			);
		}
		setCarouselItems(newCarouselItems);
	};

	const loadPairProfiles = () => {
		if (user) {
			get("/api/pairprofile", {
				userGoogleID: user.googleID,
			}).then((profileList) => {
				setPairProfiles(profileList);
				return profileList;
			}).then((profileList) => {
				resetCarousel(profileList);
			});
		}
	};

	useEffect(() => {
		loadPairProfiles();
	}, [user]);

	useEffect(() => {
		socket.on("newPairProfile", loadPairProfiles);
		return () => {
			socket.off("newPairProfile", loadPairProfiles);
		};
	}, [user]);

	let carousel;
	if (carouselItems.length === 0) {
		carousel =
			<div>
				no fronds go out and make some dummy
			</div>
	} else {
		carousel = <AliceCarousel
			mouseTracking items={carouselItems}
			keyboardNavigation={true}
			infinite={true}
			controlsStrategy="alternate"
			responsive={responsive}
			disableDotsControls={true}
			animationDuration={140}
		/>;
	}
	if (!user) {
		return (
			<div>
				Please login.
			</div>
		);
	} else {
		return (
			<div>
				<RepresentationChangePopup userGoogleID={user.googleID} />
				<NewPairPopup userGoogleID={user.googleID} />
				{carousel}
			</div>
		);
	}
};

export default Garden;