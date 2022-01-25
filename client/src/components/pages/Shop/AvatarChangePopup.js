import React, { useState, useEffect } from "react";
import ShopCatalog from "../../modules/ShopCatalog";

import Avatar from "../Avatar/Avatar";
import { avatarList } from "../../constants/constants";
import { get, post } from "../../../utilities";
import { socket } from "../../../client-socket";

// passes in a list of props
// 

const AvatarChangePopup = (props) => {
	const [timesBought, setTimesBought] = useState(0);
	const [currency, setCurrency] = useState(0);
	const [avatars, setAvatars] = useState([]);
	const [currentAvatarID, setCurrentAvatarID] = useState(0);
	const [shopCatalog, setShopCatalog] = useState(undefined);

	useEffect(() => {
		get("/api/useravatar", {
			googleID: props.googleID,
		}).then((list) => {
			setAvatars(list);
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
			setCurrentAvatarID(profile.currentAvatarID);
		});
	}, []);

	const handleBuy = (itemID) => {
		const item = avatarList[itemID];
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
			post("/api/useravatar", {
				googleID: props.googleID,
				avatarID: itemID,
			}).then(() => {
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
					currentAvatarID: itemID,
				},
			}
		).then((updatedProfile) => {
			setCurrentAvatarID(itemID);
		});
	};

	const handleReject = (itemID) => {

	};

	const setItemList = () => {
		const itemList = [];
		for (const avatar of avatarList) {
			const bought = 0;
			for (const purchased of avatars) {
				if (purchased.avatarID === avatar.avatarID) {
					bought = 1;
					break;
				}
			}
			let type;
			let callback;
			if (bought === 1) { // purchased
				if (avatar.avatarID === currentAvatarID) {
					type = "active";
					callback = handleTry;

				} else {
					type = "bought";
					callback = handleTry;
				}
			} else {
				if (avatar.cost <= currency) { // afford
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
						<Avatar
							avatarID={avatar.avatarID}
							width="85px"
						/>,
					type: type,
					callback: callback,
					key: avatar.avatarID,
					itemID: avatar.avatarID,
					cost: avatar.cost,
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
		socket.on("newUserAvatarUpdate", setItemList);
		return () => {
			socket.off("newUserAvatarUpdate", setItemList);
		};
	}, []);

	useEffect(() => {
		setItemList();
	}, [timesBought, currency, currentAvatarID, avatars]);

	return (
		<div>
			{shopCatalog}
		</div>
	);

};

export default AvatarChangePopup;