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
	}, [props.itemList]);

	const displaystuff = () => {
		console.log("NEW ITEM LIST");
		console.log(props.itemList);
	};

	return (
		<div>
			{displayItems}
			{displaystuff()}
		</div>
	);
};
export default ShopCatalog;