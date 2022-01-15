import React, { useEffect, useState, Component } from "react";

import { get, post } from "../../../utilities.js";
import Avatar from "../Avatar/Avatar.js";
import NewActivityPopup from "./Representation/NewActivityPopup.js";

// Import React Table
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 

const PairInteractionPopup = (props) => {
	const [userAvatar, setUserAvatar] = useState(undefined);
	const [otherAvatar, setOtherAvatar] = useState(undefined);
	const [activities, setActivities] = useState([]);
	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setUserAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
		});
		get("/api/userprofile", {
			googleID: props.otherGoogleID,
		}).then((profile) => {
			setOtherAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
		});
		get("/api/pairactivity", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((activityList) => {
			setActivities(activityList);
		});
	}, []);
	console.log(activities);
	console.log(props.userGoogleID);
	console.log(props.otherGoogleID);
	console.log("I WANT FOOD");
	const activityObjects = activities.map((activity, index) => {
		return (
			<div>

				<span>
					asdfasdf
				</span>
				<div key={index}>
					{activity.activityTime + " | " + activity.activityName}
				</div>
			</div>
		);
	});
	console.log(activityObjects);
	return (
		<div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
				<div>
					{userAvatar}
				</div>
				<div>
					<h1>{props.userGoogleID + " & " + props.otherGoogleID}</h1>
					{/* to do add something that would add a new activity */}
					<NewActivityPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					<br />
					<div>
						<ReactTable
							data={activities}
							columns={[
								{
									Header: "Activities <3",
									columns: [
										{
											Header: "Activity Time",
											id: "activitytime",
											accessor: d => d.activityTime
										},
										{
											Header: "Activity Name",
											id: "activityName",
											accessor: d => d.activityName
										}
									]
								},
							]}
							defaultPageSize={20}
							style={{
								height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
							}}
							className="-striped -highlight"
						/>
						<br />
					</div>
				</div>
				<div>
					{otherAvatar}
				</div>
			</div>

		</div>
	);
};

export default PairInteractionPopup;