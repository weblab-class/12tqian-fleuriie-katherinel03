import React, { useEffect, useState } from "react";

import { representationList } from "../../constants/constants";

import RepresentationAvatar from "./Representation/RepresentationAvatar";

import Item from "./Item";

import { get, post } from "../../../utilities";

import { socket } from "../../../client-socket";

const RepresentationChangePopup = (props) => {
	const [timesBought, setTimesBought] = useState(0);
	const [currency, setCurrency] = useState(0);
	const [representations, setRepresentations] = useState([]);
	const [currentRepresentationID, setCurrentRepresentationID] = useState(0);
	const [displayItems, setDisplayItems] = useState([]);
	useEffect(() => {
		get("/api/pairrepresentation", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((list) => {
			setRepresentations(list);
		});
	}, [timesBought]);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setCurrency(profile.currency);
		});
	}, []);

	useEffect(() => {
		get("/api/pairprofileone", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((profile) => {
			setCurrentRepresentationID(profile.currentRepresentationID);
		});
	}, []);

	const handleBuy = (itemID) => {
		const item = representationList[itemID];
		post("/api/userprofileupdate",
			{
				userProfile: {
					googleID: props.userGoogleID,
				},
				update: {
					currency: currency - item.cost,
				},
			}
		).then(() => {
			post("/api/pairrepresentation", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
				representationID: itemID,
			}).then(() => {
				setCurrency(currency - item.cost);
				setTimesBought(timesBought + 1);
			});
		});
	};

	const handleTry = (itemID) => { // try on something new
		post("/api/pairprofileupdate",
			{
				pairProfile: {
					userGoogleID: props.userGoogleID,
				},
				update: {
					currentRepresentationID: itemID,
				},
			}
		).then((updatedProfile) => {
			setCurrentRepresentationID(itemID);
		});
	};

	const handleReject = (itemID) => {

	};

	const setItemList = () => {
		console.log("EXECUTING");
		const itemList = [];
		for (const representation of representationList) {
			const bought = 0;
			for (const purchased of representations) {
				if (purchased.representationID === representation.representationID) {
					bought = 1;
					break;
				}
			}
			if (bought === 1) { // purchased
				if (representation.representationID === currentRepresentationID) {
					itemList.push(
						<Item
							image={<RepresentationAvatar
								representationID={representation.representationID}
								width={100}
							/>}
							type="active"
							callback={handleTry}
							key={representation.representationID}
							itemID={representation.representationID}
						/>
					);
				} else {
					itemList.push(
						<Item
							image={<RepresentationAvatar
								representationID={representation.representationID}
								width={100}
							/>}
							type="bought"
							callback={handleTry}
							key={representation.representationID}
							itemID={representation.representationID}
						/>
					);
				}
			} else {
				if (representation.cost <= currency) { // afford
					itemList.push(
						<Item
							image={<RepresentationAvatar
								representationID={representation.representationID}
								width={100}
							/>}
							type="afford"
							callback={handleBuy}
							key={representation.representationID}
							itemID={representation.representationID}
						/>
					);
				} else { // other
					itemList.push(
						<Item
							image={<RepresentationAvatar
								representationID={representation.representationID}
								width={100}
							/>}
							type="cannotAfford"
							callback={handleReject}
							key={representation.representationID}
							itemID={representation.representationID}
						/>
					);
				}
			}
		}
		setDisplayItems(itemList);
	};

	useEffect(() => {
		socket.on("newPairRepresentationUpdate", setItemList);
		return () => {
			socket.off("newPairRepresentationUpdate", setItemList);
		};
	}, []);

	useEffect(() => {
		setItemList();
	}, [timesBought, currency, currentRepresentationID, representations]);

	useEffect(() => {

	}, []);

	return (
		<div>
			{displayItems}
		</div>
	);
};

export default RepresentationChangePopup;