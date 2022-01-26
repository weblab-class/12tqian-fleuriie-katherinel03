import React from "react";
import "./Item.css";

import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


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
	let buttonText;

	if (props.type === "active") {
		buttonText = "Active";
		displayImage = (
			<div className="active">
				{props.image}
			</div>
		);
	} else if (props.type === "bought") {
		buttonText = "Try";
		displayImage = (
			<div className="bought">
				{props.image}
			</div>
		);
	} else if (props.type === "afford") {
		buttonText = "Buy";
		displayImage = (
			<div className="afford">
				{props.image}
			</div>
		);
	} else if (props.type === "cannotAfford") {
		buttonText = "Locked";
		displayImage = (
			<div className="cannotAfford">
				{props.image}
			</div>
		);
	} else {
	}

	button = <Button type="primary" shape="round" onClick={() => { props.callback(props.itemID); }} size="small">
		{buttonText}
	</Button>;

	return (
		<div className="itemCatalogWrapper">
			<div className="displayImageInside">
				{displayImage}
			</div>
			<div className="interactionSection">
				{button}
				<div className="costItem">
					{"Cost: " + props.cost}
				</div>
			</div>
		</div>
	);
};

export default Item;