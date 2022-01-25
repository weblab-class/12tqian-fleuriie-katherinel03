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

const handleDragStart = (e) => e.preventDefault();

const Garden = (props) => {
	const [user, setUser] = useState(undefined);
	const [carouselItems, setCarouselItems] = useState([]);
	const [currentGardenID, setCurrentGardenID] = useState(0);

	useEffect(() => {
		get("/api/whoami",).then((curUser) => {
			if (curUser._id) {
				setUser(curUser);
			}
		});
	}, []);


	const [avatar, setAvatar] = useState(undefined);
	useEffect(() => {
		if (user) {
			get("/api/userprofile", {
				googleID: user.googleID,
			}).then((profile) => {
				setAvatar(<Avatar avatarID={profile.currentAvatarID} width="20%" />);
				setCurrentGardenID(profile.currentGardenID);
				console.log(gardenList);
				console.log(gardenList[currentGardenID].image);
			});
		}
	}, [user]);


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
		console.log(profileList);

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
		if (user) {
			get("/api/pairprofile", {
				userGoogleID: user.googleID,
			}).then((profileList) => {
				get("/api/userachievement", {
					googleID: user.googleID,
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
								googleID: user.googleID,
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
	}, [user]);

	useEffect(() => {
		socket.on("newPairProfileUpdate", loadPairProfiles);
		return () => {
			socket.off("newPairProfileUpdate", loadPairProfiles);
		};
	}, [user]);

	useEffect(() => {
		socket.on("newUserGarden", loadPairProfiles);
		return () => {
			socket.off("newUserGarden", loadPairProfiles);
		};
	}, [user]);

	useEffect(() => {
		socket.on("deletion", loadPairProfiles);
		return () => {
			socket.off("deletion", loadPairProfiles);
		};
	}, [user]);

	useEffect(() => {
		socket.on("newPairProfile", loadPairProfiles);
		return () => {
			socket.off("newPairProfile", loadPairProfiles);
		};
	}, [user]);


	const generateCarousel = () => {
		console.log("GENERATING");
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
		if (!user) {
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
					<NewPairPopup userGoogleID={user.googleID} />
					<div className="carouselDiv">
						{carousel}
					</div>
				</div>
			);
		}
	}


	return (
		<div className="garden-holder" style={!user ? {} : {
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