import React, { useState, useEffect } from "react";

import "./HealthBar.css";

import healthBarImage from "./HealthBar.png"

const HEALTH_BAR_WIDTH = 101;

const HealthBar = (props) => {
	const [health, setHealth] = useState(100);

	useEffect(() => {
		setHealth(props.health);
	}, [props.health]);

	const getHealthBarWidth = () => {
		return health / 100 * HEALTH_BAR_WIDTH * (0.818);
	};

	const getHealthBarColor = () => {
		const hue = (health / 100 * 120).toString(10);
		return ["hsl(", hue, ", 100%, 50%)"].join("");
	};

	return (
		<div>
			<img src={healthBarImage} style={
				{
					width: HEALTH_BAR_WIDTH,
				}
			}
			/>
			<div className="healthBarBackground"
				style={{
					backgroundColor: getHealthBarColor(),
					top: HEALTH_BAR_WIDTH * -0.18,
					left: HEALTH_BAR_WIDTH * 0.16,
					width: getHealthBarWidth(),
					height: HEALTH_BAR_WIDTH * 0.14,
				}}
			>
			</div>
		</div>
	);
};

export default HealthBar;