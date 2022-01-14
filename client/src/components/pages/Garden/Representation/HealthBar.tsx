import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import "./HealthBar.css";

import healthBarImage from "./HealthBar.png";


const HEALTH_BAR_WIDTH = 101;

type Props = RouteComponentProps & {
	health: Number,
};

const HealthBar = (props: Props) => {
	// const [health, setHealth] = useState<Number>(100);
	// useEffect(() => {
	// 	setHealth(props.health);
	// }, []);

	const getHealthBarWidth = ():  number => {
		return (Number(props.health) / 100 * HEALTH_BAR_WIDTH * (0.818));
	};

	const getHealthBarColor = () => {
		const hue : String = (Number(props.health) / 100 * 120).toString(10);
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
					top: HEALTH_BAR_WIDTH * -0.21,
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