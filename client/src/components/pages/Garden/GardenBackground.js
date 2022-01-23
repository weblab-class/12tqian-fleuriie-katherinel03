import React, { useState, useEffect } from "react";

import { gardenList } from "../../constants/constants";

const GardenBackground = (props) => {
	const image = <img src={gardenList[props.gardenID].image} width={props.width} />;
	return (
		<div>
			{image}
		</div>
	);
};

export default GardenBackground;