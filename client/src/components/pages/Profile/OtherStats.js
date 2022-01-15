import React, { useEffect, useState } from "react";

import "./OtherStats.css";

import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const OtherStats = (props) => {
    const [achievement, setAchievement] = useState([]);

    // get current achievements from server

    useEffect(() => {
        get("/api/userachievement", { googleID: props.googleID }.then((user) => {
            setAchievement(user.achievementName);

            // ayo i think this should be in a list so we can display them???? bro idk how to code :(

        }))
    }, []);
    // bro idk what the heck im doing or why theres an error CRYGE
    
    return (
        <div>

        </div>
    );
}

export default OtherStats;