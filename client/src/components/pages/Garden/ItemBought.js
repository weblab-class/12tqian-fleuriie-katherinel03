import React from "react";

const ItemBought = (props) => {
	return (
		<div>
			{props.image}
			<button onClick={props.callbackFunction}>Use</button>
		</div>
	);
};

export default ItemBought;