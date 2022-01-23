import React, { useEffect, useState } from "react";

import "./OtherStats.css";

import "../../../utilities.css";
import { get, post } from "../../../utilities.js";

const OtherStats = (props) => {
    const [achievement, setAchievement] = useState([]);

    // get current achievements from server

    useEffect(() => {
        get("/api/userachievement", { googleID: props.googleID }).then((user) => {
            setAchievement(user.achievementName);

            // ayo i think this should be in a list so we can display them???? bro idk how to code :(

        })
    }, []);
    // bro idk what the heck im doing or why theres an error CRYGE

    return (
        <div>

        </div>
    );
}

export default OtherStats;

// const [userAvatar, setUserAvatar] = useState(undefined);
// 	const [otherAvatar, setOtherAvatar] = useState(undefined);
// 	const [activities, setActivities] = useState([]);
// 	useEffect(() => {
// 		get("/api/userprofile", {
// 			googleID: props.userGoogleID,
// 		}).then((profile) => {
// 			setUserAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
// 		});
// 		get("/api/userprofile", {
// 			googleID: props.otherGoogleID,
// 		}).then((profile) => {
// 			setOtherAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
// 		});
// 		get("/api/pairactivity", {
// 			userGoogleID: props.userGoogleID,
// 			otherGoogleID: props.otherGoogleID,
// 		}).then((activityList) => {
// 			setActivities(activityList);
// 		});
// 	}, []);