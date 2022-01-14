import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import avatar from "./AvatarImages/Avatar.png";

type Props = RouteComponentProps & {
	avatarName: String,
	width: number,
};

const Avatar = (props : Props) => {
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