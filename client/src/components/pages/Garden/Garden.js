import React, { Component, useEffect, useState } from "react";

import "../../../utilities.css";

import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

import Representation from "./Representation/Representation.js";
import NewPairPopup from "./NewPairPopup";


const handleDragStart = (e) => e.preventDefault();

const carouselItems = [];

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 5 },
};

const Garden = (props) => {
	const [user, setUser] = useState(undefined);
	const [pairAvatars, setPairAvatars] = useState([]);
	const [carouselItems, setCarouselItems] = useState([]);

	useEffect(() => {
		get("/api/whoami",).then((curUser) => {
			if (curUser._id) {
				setUser(curUser);
			}
		});
	}, []);

	const resetCarousel = (avatarList) => {
		const newCarouselItems = [];
		for (const avatar of avatarList) {
			newCarouselItems.push(
				<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
					<Representation userGoogleID={avatar.userGoogleID} otherGoogleID={avatar.otherGoogleID} />
				</span>
			);
		}
		setCarouselItems(newCarouselItems);
	};

	const loadPairAvatars = () => {
		if (user) {
			get("/api/pairavatar", {
				userGoogleID: user.googleID,
			}).then((avatarList) => {
				setPairAvatars(avatarList);
				return avatarList;
			}).then((avatarList) => {
				resetCarousel(avatarList);
			});
		}
	};

	useEffect(() => {
		loadPairAvatars();
	}, [user]);

	useEffect(() => {
		socket.on("newPairAvatar", loadPairAvatars);
		return () => {
			socket.off("newPairAvatar", loadPairAvatars);
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
				<NewPairPopup userGoogleID={user.googleID} />
				{carousel}
			</div>
		);
	}
};

export default Garden;