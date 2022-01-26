import React, { useState, useEffect } from "react";
import ShopCatalog from "../../modules/ShopCatalog";

import RepresentationAvatar from "../Garden/Representation/RepresentationAvatar";
import { representationList } from "../../constants/constants";
import { get, post } from "../../../utilities";
import { socket } from "../../../client-socket";

import { getStage } from "../../constants/constants";
// passes in a list of props
// 

const RepresentationChangePopup = (props) => {
	const [timesBought, setTimesBought] = useState(0);
	const [currency, setCurrency] = useState(0);
	const [representations, setRepresentations] = useState([]);
	const [currentRepresentationID, setCurrentRepresentationID] = useState(0);
	const [experience, setExperience] = useState(0);
	const [shopCatalog, setShopCatalog] = useState(undefined);
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
			setExperience(profile.totalExperience);
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
					otherGoogleID: props.otherGoogleID,
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
		const itemList = [];
		for (const representation of representationList) {
			const bought = 0;
			for (const purchased of representations) {
				if (purchased.representationID === representation.representationID) {
					bought = 1;
					break;
				}
			}
			let type;
			let callback;

			if (bought === 1) { // purchased
				if (representation.representationID === currentRepresentationID) {
					type = "active";
					callback = handleTry;
				} else {
					type = "bought";
					callback = handleTry;
				}
			} else {
				if (representation.cost <= currency) { // afford
					type = "afford";
					callback = handleBuy;
				} else { // other
					type = "cannotAfford";
					callback = handleReject;
				}
			}

			itemList.push(
				{
					image: <RepresentationAvatar
						representationID={representation.representationID}
						width="100%"
						stage={getStage(experience)}
					/>,
					type: type,
					callback: callback,
					key: representation.representationID,
					itemID: representation.representationID,
					cost: representation.cost,
				}
			);
		}
		setShopCatalog(
			<ShopCatalog 
				itemList={itemList}
				googleID={props.userGoogleID}
			/>
		);
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

	return (
		<div>
			{shopCatalog}
		</div>
	);

};

export default RepresentationChangePopup;