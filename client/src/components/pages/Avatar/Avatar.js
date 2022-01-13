import React, { useState, useEffect } from "react";

const Avatar = (props) => {
	console.log(props.avatarName);
	const avatarLocation = './Avatars/' + props.avatarName + '.png';
	console.log(avatarLocation);
	const image = require(avatarLocation);
	return (
		<div>
			<img src={require('./Avatars/Avatar.png').default} />
			{/* <img src={avatarLocation} /> */}
		</div>
	);
};

export default Avatar;