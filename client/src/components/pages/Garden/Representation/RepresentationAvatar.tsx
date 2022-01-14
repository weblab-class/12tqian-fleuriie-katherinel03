import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import avatar from "./RepresentationAvatarImages/Representation.png";

type Props = RouteComponentProps & {
	avatarName: String,
	width: number,
};

const RepresentationAvatar = (props : Props) => {
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