import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

import "../../../utilities.css";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Garden.css";

// testing code 
import Avatar from "../Avatar/Avatar";

import HealthBar from "./Representation/HealthBar";
import Representation from "./Representation/Representation";
// end testing code

type Props = RouteComponentProps & {};

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

const Garden = (props: Props) => {
	return (
		<div>
			<AliceCarousel mouseTracking items={items} keyboardNavigation={true} infinite={true} controlsStrategy="alternate" responsive={responsive} />
		</div>
	);
};

export default Garden;
