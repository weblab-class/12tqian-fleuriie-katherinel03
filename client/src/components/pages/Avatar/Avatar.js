import React, { useState, useEffect } from "react";

import avatar from "./Avatars/Avatar.png";



const Avatar = (props) => {
	let image;
	switch (props.avatarName) {
		case "Avatar":
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

export default Avatar;