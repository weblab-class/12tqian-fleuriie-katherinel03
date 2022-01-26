import React from "react";
import ReactTooltip from 'react-tooltip';
import { formatTime } from "../../constants/constants";

// props
// literally the badge object ig
// badge image
// badge name
// badge description
// date of acquisition
const SingleAchievement = (props) => {
	const badgeIdentifier = "badge-tooltip" + String(props.badge.badgeID);
	return (
		<div>
			<div>
				<img src={props.badge.image} data-tip data-for={badgeIdentifier} width="60%" />
				<ReactTooltip id={badgeIdentifier} aria-haspopup='true' place="top" type="light" effect="float">
					<div>
						<div>
							<h2>{props.badge.name}</h2>
						</div>
						<div>
							{props.badge.description}
						</div>
						<div>
							{formatTime(new Date(props.achievementDate))}
						</div>
					</div>
				</ReactTooltip>
			</div>
		</div>
	);
};

export default SingleAchievement;