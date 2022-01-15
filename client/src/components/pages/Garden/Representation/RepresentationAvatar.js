import React, { useState, useEffect } from "react";
import avatar from "./RepresentationAvatarImages/Representation.png";

const RepresentationAvatar = (props) => {
	let image;
	switch (props.avatarName) {
		case "Representation":
			image = <img src={avatar} width={props.width}/>;
			break;
		default:
			image = <img src={avatar} width={props.width}/>;
	}
	return (
		<div> 
			{image}
		</div>
	);
};

export default RepresentationAvatar;