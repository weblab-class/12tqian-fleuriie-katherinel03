import React, { useState, useEffect } from "react";
import ShopCatalog from "../../modules/ShopCatalog";

import { gardenList } from "../../constants/constants";
import { get, post } from "../../../utilities";
import { socket } from "../../../client-socket";
import GardenBackground from "./GardenBackground";

const GardenChangePopup = (props) => {
	const [timesBought, setTimesBought] = useState(0);
	const [currency, setCurrency] = useState(0);
	const [gardens, setGardens] = useState([]);
	const [currentGardenID, setCurrentGardenID] = useState(1);
	const [shopCatalog, setShopCatalog] = useState(undefined);
	useEffect(() => {
		get("/api/usergarden", {
			googleID: props.googleID,
		}).then((list) => {
			setGardens(list);
		});
	}, [timesBought]);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.googleID,
		}).then((profile) => {
			setCurrency(profile.currency);
		});
	}, []);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.googleID,
		}).then((profile) => {
			setCurrentGardenID(profile.currentGardenID);
		});
	}, []);

	const handleBuy = (itemID) => {
		const item = gardenList[itemID];
		post("/api/userprofileupdate",
			{
				userProfile: {
					googleID: props.googleID,
				},
				update: {
					currency: currency - item.cost,
				},
			}
		).then(() => {
			post("/api/usergarden", {
				googleID: props.googleID,
				gardenID: itemID,
			}).then((data) => {
				setCurrency(currency - item.cost);
				setTimesBought(timesBought + 1);
			});
		});
	};

	const handleTry = (itemID) => { // try on something new
		post("/api/userprofileupdate",
			{
				userProfile: {
					googleID: props.googleID,
				},
				update: {
					currentGardenID: itemID,
				},
			}
		).then((updatedProfile) => {
			setCurrentGardenID(itemID);
		});
	};

	const handleReject = (itemID) => {

	};

	const setItemList = () => {
		const itemList = [];
		for (const garden of gardenList) {
			const bought = 0;
			for (const purchased of gardens) {
				if (purchased.gardenID === garden.gardenID) {
					bought = 1;
					break;
				}
			}
			let type;
			let callback;
			if (bought === 1) { // purchased
				if (garden.gardenID === currentGardenID) {
					type = "active";
					callback = handleTry;

				} else {
					type = "bought";
					callback = handleTry;
				}
			} else {
				if (garden.cost <= currency) { // afford
					type = "afford";
					callback = handleBuy;
				} else { // other
					type = "cannotAfford";
					callback = handleReject;
				}
			}
			itemList.push(
				{
					image:
						<GardenBackground
							gardenID={garden.gardenID}
							width="140px"
						/>,
					type: type,
					callback: callback,
					key: garden.gardenID,
					itemID: garden.gardenID,
					cost: garden.cost,
				}
			);
		}
		setShopCatalog(
			<ShopCatalog
				itemList={itemList}
				googleID={props.googleID}
			/>
		);
	};

	useEffect(() => {
		socket.on("newUserGarden", setItemList);
		return () => {
			socket.off("newUserGarden", setItemList);
		};
	}, []);

	useEffect(() => {
		setItemList();
	}, [timesBought, currency, currentGardenID, gardens]);

	return (
		<div>
			{shopCatalog}
		</div>
	);
};

export default GardenChangePopup;