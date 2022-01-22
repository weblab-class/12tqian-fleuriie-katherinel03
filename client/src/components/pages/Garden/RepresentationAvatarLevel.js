import React, { useState, useEffect } from "react";

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./RepresentationAvatarLevel.css";

// props include representation avatar

// props include level
// props also include the experience left over

const RepresentationAvatarLevel = (props) => {
	const [displayImage, setDisplayImage] = useState(undefined);
	const [level, setLevel] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		setDisplayImage(
			<CircularProgressbarWithChildren value={66}>
				<div className="centeredWithinProgressBar">
					<div className="itemWithinProgressBarDiv">
						{props.representationAvatar}
					</div>
					<div>Level 70</div>
				</div>
			</CircularProgressbarWithChildren>
		);
	}, [props.representationAvatar, props.totalExperience]);

	return (
		<div>
			{displayImage}
		</div>
	);
};

export default RepresentationAvatarLevel;