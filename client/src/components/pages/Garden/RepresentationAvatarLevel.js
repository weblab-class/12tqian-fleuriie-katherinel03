import React, { useState, useEffect } from "react";

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./RepresentationAvatarLevel.css";

import { getLevel, getRemainder, getToNextLevel } from "../../constants/constants";

// props include representation avatar

// props include level
// props also include the experience left over

const RepresentationAvatarLevel = (props) => {
	const [displayImage, setDisplayImage] = useState(undefined);

	useEffect(() => {
		const rem = getRemainder(props.totalExperience);
		const level = getLevel(props.totalExperience);
		const total = getToNextLevel(props.totalExperience);
		const percentage = rem / total * 100;
		setDisplayImage(
			<CircularProgressbarWithChildren value={percentage}>
				<div className="centeredWithinProgressBar">
					<div className="itemWithinProgressBarDiv">
						{props.representationAvatar}
					</div>
					<div>Level {level}</div>
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