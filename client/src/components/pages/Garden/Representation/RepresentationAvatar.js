import React, { useState, useEffect } from "react";

import { representationList } from "../../../constants/constants"

// props
// will include representationID
// also will include stage
const RepresentationAvatar = (props) => {
	const image = <img src={representationList[props.representationID].images[props.stage - 1]} width={props.width} />
	return (
		<div>
			{image}
		</div>
	);
};

export default RepresentationAvatar;