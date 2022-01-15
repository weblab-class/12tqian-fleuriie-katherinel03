import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar.js";
import EditProfile from "./EditProfile.js";
import OtherStats from "./OtherStats.js";
import Username from "./Username.js";

import "../../../utilities.css";
import "./Profile.css";
import {get, post} from "../../../utilities.js";

const Profile  = (props) => {

    // getting user data!

    get("/api/userprofile", {
        googleID: "",
        currentAvatar: "",
        currency: "",
    })
    get("/api/userachievement", {
        googleID: "",
        achievementName: "",
    })

    // i want to die! :)

    return (
        <div className="Profile-container">
            help
            <EditProfile />
        </div>
    );
};

export default Profile;