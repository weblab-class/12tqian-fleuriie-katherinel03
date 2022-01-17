import React, { useState, useEffect } from "react";

import { avatarList } from "../../constants/constants";

const Avatar = (props) => {
	const image = <img src={avatarList[props.avatarID].image} width={props.width} />;
	console.log(props);
	console.log(avatarList[props.avatarID]);
	console.log("EHHH");
	console.log(avatarList);
	return (
		<div>
			{image}
		</div>
	);
};

export default Avatar;