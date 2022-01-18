import React, { useEffect, useState } from "react";

import { representationList } from "../../constants/constants";

import RepresentationAvatar from "./Representation/RepresentationAvatar";

import ItemBought from "./ItemBought";
import ItemCanAfford from "./ItemCanAfford";
import ItemCannotAfford from "./ItemCannotAfford";

import { get, post } from "../../../utilities";

const RepresentationChangePopup = (props) => {
	const [currency, setCurrency] = useState(0);
	const [representations, setRepresentations] = useState([]);

	useEffect(() => {
		get("/api/pairrepresentation", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		}).then((list) => {
			setRepresentations(list);
		});
	}, []);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setCurrency(profile.currency);
		});
	}, []);

	const handleBuy = (itemID) => {
		const item = representationList[itemID];
		setCurrency(currency - item.cost);
		post("/api/userprofileupdate",
			{
				googleID: props.userGoogleID,
			},
			{
				currency: currency,
			},
		);
	};

	const handleTry = (itemID) => {
		post("/api/userprofileupdate",
			{
				googleID: props.userGoogleID,
			},
			{
				currentRepresentationID: itemID,
			},
		);
	};

	const boughtRepresentations = [];
	const affordRepresentations = [];
	const otherRepresentations = [];

	for (const representation of representationList) {
		const bought = 0;
		for (const purchased of representations) {
			if (purchased.representationID === representation.representationID) {
				bought = 1;
				break;
			}
		}
		if (bought === 1) { // purchased
			boughtRepresentations.push(
				<ItemBought
					image={<RepresentationAvatar
						representationID={representation.representationID}
						width={100}
					/>}
					callback={handleTry}
				/>
			);
		} else {
			if (representation.cost <= currency) { // afford

			} else { // other

			}
		}
	}
	console.log(boughtRepresentations);
	console.log("AFT");
	return (
		<div>
			{boughtRepresentations}
		</div>
	);
};

export default RepresentationChangePopup;