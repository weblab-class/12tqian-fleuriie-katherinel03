import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import shop from "./shop.png";

import "../../../utilities.css";
import "./Shop.css";
import Collapsible from 'react-collapsible';
import AvatarChangePopup from "./AvatarChangePopup";
import {get, post} from "../../../utilities";

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
				<div>
					Please login.
				</div>
			);
		} else {
			return (
				<div className="Shop-background">
					<div className="shop">
						<Collapsible trigger="Avatar Customization">
							<AvatarChangePopup googleID={user.googleID} />
						</Collapsible>
						<div className="space"></div>
						<Collapsible trigger="Garden Customization">

						</Collapsible>
					</div>
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