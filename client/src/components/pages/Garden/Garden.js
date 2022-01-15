import React, { Component } from "react";

import "../../../utilities.css";

import {get, post} from "../../../utilities.js";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

// testing code 

import Representation from "./Representation/Representation.js";


const handleDragStart = (e) => e.preventDefault();

const items = [
	<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
		<Representation />
	</span>,
	<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
		<Representation />
	</span>,
	<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
		<Representation />
	</span>,
	<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
		<Representation />
	</span>,
	<span onDragStart={handleDragStart} role="presentation" className="carouselRepresentation">
		<Representation />
	</span>,
];

const responsive = {
	0: { items: 1 },
	568: { items: 2 },
	1024: { items: 5 },
};

const Garden = (props) => {
  post("/api/pairactivity", {
    userGoogleID: "user1",
    otherGoogleID: "user2",
    activityName: "activity",
    activityTime: new Date(),
  }).then((activity) => {
    console.log(activity);
  });
	return (
		<div>
			<AliceCarousel
				mouseTracking items={items}
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