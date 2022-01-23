import React, { useState, useEffect } from "react";

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./RepresentationAvatarLevel.css";

import { EXPERIENCE_PER_ACTIVITY, EXPERIENCE_PER_LEVEL } from "../../constants/constants";

// props include representation avatar

// props include level
// props also include the experience left over

const RepresentationAvatarLevel = (props) => {
	const [displayImage, setDisplayImage] = useState(undefined);

	useEffect(() => {
		const rem = props.totalExperience % EXPERIENCE_PER_LEVEL;
		const level = (props.totalExperience - rem) / EXPERIENCE_PER_LEVEL + 1;
		const percentage = rem / level * 100;
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