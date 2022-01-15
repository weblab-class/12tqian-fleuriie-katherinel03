import React, { useEffect, useState } from "react";

import "./Avatar.css";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const Avatar = (props) => {
    const [avatar, setAvatar] = useState([]);

    // get current avatar from server

    useEffect(() => {
        get("/api/userprofile", { googleID: props.googleID }.then((user) => {
            setAvatar(user.currentAvatar);

            // not sure if this should be user.currentAvatar or userprofile.currentAvatar so if it breaks this is probably what's wrong

        }))
    }, []);

    // creates image variable of avatar

    let image;
	switch (props.currentAvatar) {
		case "avatar1":
			image = <img src={"avatar1.jpg"} width={props.width}/>;
			break;
		case "avatar2":
            image = <img src={"avatar2.jpg"} width={props.width}/>;
            break;
        // this is janky but copypaste when more avatars, we're hardcoding for each avatar
        default:
			image = <img src={avatar} width={props.width}/>;
	}
	return (
		<div> 
			{image}
		</div>
	);
}

export default Avatar;