import React, { Component, useEffect, useState } from "react";

import "../../../utilities.css";

import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

import Representation from "./Representation/Representation.js";
import NewPairPopup from "./NewPairPopup";
import Avatar from "../Avatar/Avatar.js";

import { gardenList } from "../../constants/constants";

import RepresentationChangePopup from "./RepresentationChangePopup";
import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HelpButton from "../../modules/HelpButton";

const handleDragStart = (e) => e.preventDefault();

const Garden = (props) => {
	const [carouselItems, setCarouselItems] = useState([]);
	const [currentGardenID, setCurrentGardenID] = useState(0);


	const [avatar, setAvatar] = useState(undefined);
	useEffect(() => {
		if (props.user) {
			get("/api/userprofile", {
				googleID: props.user.googleID,
			}).then((profile) => {
				setAvatar(<Avatar avatarID={profile.currentAvatarID} width="20%" />);
				setCurrentGardenID(profile.currentGardenID);
			});
		}
	}, [props.user]);


	const resetCarousel = (profileList) => {
		const newCarouselItems = [];
		profileList.sort(function (a, b) {
			var nameA = a.pairName.toLowerCase(), nameB = b.pairName.toLowerCase();
			if (nameA < nameB) //sort string ascending
				return -1;
			if (nameA > nameB)
				return 1;
			return 0; //default return value (no sorting)
		});
		for (const profile of profileList) {
			newCarouselItems.push(
				<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
					<Representation userGoogleID={profile.userGoogleID} otherGoogleID={profile.otherGoogleID} />
				</span>
			);
		}

		// newCarouselItems.sort(function (a, b) {
		// 	var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
		// 	if (nameA < nameB) //sort string ascending
		// 		return -1;
		// 	if (nameA > nameB)
		// 		return 1;
		// 	return 0; //default return value (no sorting)
		// });

		setCarouselItems(newCarouselItems);
	};

	const uniformName = (name) => {
		return (name.trim()).toLowerCase();
	};

	const loadPairProfiles = () => {
		if (props.user) {
			get("/api/pairprofile", {
				userGoogleID: props.user.googleID,
			}).then((profileList) => {
				get("/api/userachievement", {
					googleID: props.user.googleID,
				}).then((achievements) => {
					if (!achievements.includes(20)) {
						let kat = 0;
						let timmy = 0;
						let annie = 0;
						for (const obj of profileList) {
							if (uniformName(obj.pairName) === "kat") {
								kat = 1;
							}
							if (uniformName(obj.pairName) === "annie") {
								annie = 1;
							}
							if (uniformName(obj.pairName) === "timmy") {
								timmy = 1;
							}
						}
						if (kat + timmy + annie == 3) {
							post("/api/userachievement", {
								googleID: props.user.googleID,
								achievementID: 20,
								achievementDate: String(new Date()),
							});
						}
					}
				})
				resetCarousel(profileList);
			});
		}
	};

	useEffect(() => {
		loadPairProfiles();
	}, [props.user]);

	useEffect(() => {
		socket.on("newPairProfileUpdate", loadPairProfiles);
		return () => {
			socket.off("newPairProfileUpdate", loadPairProfiles);
		};
	}, [props.user]);

	useEffect(() => {
		socket.on("newUserGarden", loadPairProfiles);
		return () => {
			socket.off("newUserGarden", loadPairProfiles);
		};
	}, [props.user]);

	useEffect(() => {
		socket.on("deletion", loadPairProfiles);
		return () => {
			socket.off("deletion", loadPairProfiles);
		};
	}, [props.user]);

	useEffect(() => {
		socket.on("newPairProfile", loadPairProfiles);
		return () => {
			socket.off("newPairProfile", loadPairProfiles);
		};
	}, [props.user]);


	const generateCarousel = () => {
		let carousel;
		if (carouselItems.length === 0) {
			carousel =
				<div className="no-friends">
					add your friends!!
				</div>
		} else {

			// const settings = {
			// 	className: "center",
			// 	centerMode: true,
			// 	infinite: true,
			// 	centerPadding: "60px",
			// 	slidesToShow: 3,
			// 	speed: 500
			// };
			const settings = {
				className: "center",
				infinite: false,
				centerPadding: "60px",
				slidesToShow: 5,
				swipeToSlide: true,
				accessibility: true,
				speed: 200,
			};

			carousel = (
				<Slider {...settings}>
					{
						carouselItems.map(
							(item, index) =>
								<div key={index}>{item}</div>
						)
					}
				</Slider>
			);
			// carousel = carouselItems.map(
			// 	(item, index) =>
			// 		<div key={index}>{item}</div>
			// );
		}
		if (!props.user) {
			return (
				<div className="notLoggedIn">
					Please login to view your garden.
					<br />
					<br />
					<br />
					<br />
				</div>
			);
		} else {
			return (
				<div className="pair-popup-holder">
					<div className="help-button-div3">
						<HelpButton
							helpHeader={'Garden'}
							helpDescription={"Add your friends and log your activities with your them to prevent their health from going to zero! A plant's health will steadily drop if you do not interact with your friend enough."}
						/>
					</div>
					<NewPairPopup userGoogleID={props.user.googleID} />
					<div className="carouselDiv">
						{carousel}
					</div>
				</div>
			);
		}
	}


	return (
		<div className="garden-holder" style={!props.user ? {} : {
			backgroundImage: `url(${gardenList[currentGardenID].image})`,
		}}>
			{generateCarousel()}
			<div className="avatar-holder">{avatar}</div>
			<br />
			<br />
			<br />
			<br />
		</div>
	);
};

export default Garden;