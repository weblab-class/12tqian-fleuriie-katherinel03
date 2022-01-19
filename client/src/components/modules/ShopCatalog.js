import React, { useState, useEffect } from "react";

import Item from "./Item";

// passes in a list of props

const ShopCatalog = (props) => {

	const [displayItems, setDisplayItems] = useState([]);
	useEffect(() => {
		setDisplayItems(
			props.itemList.map((item) => {
				return <Item
					image={item.image}
					type={item.type}
					callback={item.callback}
					key={item.key}
					itemID={item.itemID}
					cost={item.cost}
				/>
			})
		);
	}, []);

	return (
		<div>
			{displayItems}
		</div>
	);
};
export default ShopCatalog;