import React, { useState, useEffect } from "react";

import "./ShopCatalog.css";

import Item from "./Item";

import { get, post } from "../../utilities";

// passes in a list of props

const ShopCatalog = (props) => {

	const [displayItems, setDisplayItems] = useState([]);
	const [currency, setCurrency] = useState(0);
	useEffect(() => {
		setDisplayItems(
			props.itemList.map((item) => {
				return (
					<div className="child" key={item.key}>
						<Item
							image={item.image}
							type={item.type}
							callback={item.callback}
							key={item.key}
							itemID={item.itemID}
							cost={item.cost}
						/>
					</div>
				);
			})
		);
		get("/api/userprofile", {
			googleID: props.googleID,
		}).then((userProfile) => {
			setCurrency(userProfile.currency);
		});
	}, [props.itemList]);

	return (
		<div className="parentWrapper">
			<div className="currencyLabel">
				Total currency: {currency}
			</div>
			<div className="parent">
				{displayItems}
			</div>
		</div>
	);
};
export default ShopCatalog;