import React from "react";
import "./Item.css";

// this has props
// type: 
// active whether the item is the one actively used
// bought
// afford
// cannotAfford
// image source
// handle back 

const Item = (props) => {
	let button; // this is the button 
	let displayImage;
	if (props.type === "active") {	
		button = <button onClick={() => {props.callback(props.itemID)}}>Active</button>;
		displayImage = (
			<div className="active">
				{props.image}
			</div>
		);
	} else if (props.type === "bought") {
		button = <button onClick={() => {props.callback(props.itemID)}}>Try on!</button>;
		displayImage = (
			<div className="bought">
				{props.image}
			</div>
		);
	} else if (props.type === "afford") {
		button = <button onClick={() => {props.callback(props.itemID)}}>Buy</button>;
		displayImage = (
			<div className="afford">
				{props.image}
			</div>
		);
	} else if (props.type === "cannotAfford") {
		button = <button>Need more money</button>;
		displayImage = (
			<div className="cannotAfford">
				{props.image}
			</div>
		);
	} else {
		console.log("Incorrect item typing passed");
	}
	return (
		<div>
			{props.image}
			{button};
		</div>
	);
};

export default Item;