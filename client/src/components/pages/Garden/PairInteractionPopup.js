import React, { useEffect, useState, Component } from "react";

import { get, post } from "../../../utilities.js";
import Avatar from "../Avatar/Avatar.js";
import NewActivityPopup from "./Representation/NewActivityPopup.js";
import RepresentationAvatar from "./Representation/RepresentationAvatar.js";
import { socket } from "../../../client-socket"
import "./PairInteractionPopup.css";

// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import Collapsible from 'react-collapsible';

import RepresentationChangePopup from "./RepresentationChangePopup.js";

const PairInteractionPopup = (props) => {
	const [userAvatar, setUserAvatar] = useState(undefined);
	const [otherAvatar, setOtherAvatar] = useState(undefined);
	const [representation, setRepresentation] = useState(undefined);
	const [activities, setActivities] = useState([]);
	const [userName, setUserName] = useState(undefined);
	const [otherName, setOtherName] = useState(undefined);


	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setUserName(profile.userName);
			setUserAvatar(<Avatar avatarID={profile.currentAvatarID} width="100%" />);
		});
	}, []);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.otherGoogleID,
		}).then((profile) => {
			setOtherAvatar(<Avatar avatarID={profile.currentAvatarID} width="100%" />);
		});
	}, []);

	const resetRepresentation = () => {
		get("/api/pairprofileone", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((pairProfile) => {
			setRepresentation(
				<RepresentationAvatar
					representationID={pairProfile.currentRepresentationID}
					width="30%"
					stage={2}
				/>
			);
			setOtherName(pairProfile.pairName);
		});
	};

	useEffect(() => {
		resetRepresentation();
	}, []);

	const setPairActivities = (data) => {
		get("/api/pairactivity", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((activityList) => {
			setActivities(activityList);
		});
	};

	const newPairProfileUpdate = (data) => {
		resetRepresentation();
	};

	useEffect(() => {
		setPairActivities({});
	}, []);

	useEffect(() => {
		socket.on("newPairProfileUpdate", newPairProfileUpdate);
		return () => {
			socket.off("newPairProfileUpdate", newPairProfileUpdate);
		};
	}, []);

	useEffect(() => {
		socket.on("newPairActivity", setPairActivities);
		return () => {
			socket.off("newPairActivity", setPairActivities);
		};
	}, []);

	const formatTime = (date) => {
		date = new Date(date);
		let shortMonth = date.toLocaleString('en-us', { month: 'short' }); /* Jun */
		let day = date.getUTCDate();
		let year = date.getUTCFullYear();
		return shortMonth + " " + day + ", " + year;
	};

	return (
		<div className="container">

			<div className="sideColumn">
			</div>
			<div>
				<div className="name-avatar-container">
					<h1 className="names" textAlign="center">{userName + " & " + otherName}</h1>
					<div className="avatars-plant">
						{userAvatar}
						{representation}
						{otherAvatar}
					</div>
				</div >
				<Collapsible trigger=
					{<div className="shop-button">Change Plant</div>}>
					<RepresentationChangePopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
				</Collapsible>
				{/* to do add something that would add a new activity */}
				<NewActivityPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
				<br />
				<div>
					<ReactTable
						data={activities}
						width="100%"
						columns={[
							{
								Header: "Activities <3",
								columns: [
									{
										Header: "Date",
										id: "activityTime",
										accessor: d => {
											return (
												<div style={{
													textalign: "center"
												}}>
													{formatTime(d.activityTime)}
												</div>);
										},
										width: 75,
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
			<div className="sideColumn">
			</div>
		</div>
	);
};

export default PairInteractionPopup;