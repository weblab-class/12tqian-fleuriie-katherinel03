import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import shop from "./shop.png";

import "../../../utilities.css";
import "./Shop.css";
import Collapsible from 'react-collapsible';
import AvatarChangePopup from "./AvatarChangePopup";
import GardenChangePopup from "./GardenChangePopup";
import {get, post} from "../../../utilities";
import HelpButton from "../../modules/HelpButton";

const Shop = () => {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		get("/api/whoami",).then((curUser) => {
			if (curUser._id) {
				setUser(curUser);
			}
		});
	}, []);

	const generateShop = () => {
		if (!user) {
			return (
				<div className="log-in">
					Please login to view the shop.
				</div>
			);
		} else {
			return (
				<div className="Shop-background">
						<div className="help-button-div">
							<HelpButton
								helpHeader={'Shop'}
								helpDescription={'The shop is where you purchase avatars for your profile and backgrounds for your garden! To earn more currency, add friends and start adding activities!'}
							/>
						</div>
					<div className="shop">
						<Collapsible trigger=
						{<div className="shop-button">Avatar Customization</div>}>
							<AvatarChangePopup googleID={user.googleID} />
						</Collapsible>
						<div className="space"></div>
						<Collapsible trigger=
						{<div className="shop-button">Garden Customization</div>}>
							<GardenChangePopup googleID={user.googleID} />
						</Collapsible>
					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>

			);
		}
	}

	return (
		<div>
			{generateShop()}
		</div>
	)


};

export default Shop;