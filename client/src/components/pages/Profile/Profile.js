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
    const [user, setUser] = useState();
    useEffect(() => {
        get("/api/user", { googleID: props.googleID }.then((user) => {
            setUser(user.name);
        }))
    }, []);
    // getting user data!

    // i want to die! :)
    if (!user) {
        return <div> Log in before you can view your profile! </div>
    }
    return (
        <div className="Profile-container">
            help
            <EditProfile />
        </div>
    );
};

export default Profile;