import React, { useState, useEffect } from "react";

import "./ShopCatalog.css";

import Item from "./Item";

// passes in a list of props

const ShopCatalog = (props) => {

	const [displayItems, setDisplayItems] = useState([]);
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
	}, [props.itemList]);

	return (
		<div className="parentWrapper">
			<div className="parent">
				{displayItems}
			</div>
		</div>
	);
};
export default ShopCatalog;