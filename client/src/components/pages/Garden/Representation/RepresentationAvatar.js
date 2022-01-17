import React, { useState, useEffect } from "react";

import { representationList } from "../../../constants/constants"

const RepresentationAvatar = (props) => {
	console.log(representationList);
	console.log(props);
	const image = <img src={representationList[props.avatarID].image} width={props.width} />
	return (
		<div>
			{image}
		</div>
	);
};

export default RepresentationAvatar;