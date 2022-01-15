import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Avatar from "./Avatar.js";
import EditProfile from "./EditProfile.js";
import OtherStats from "./OtherStats.js";

import "../../../utilities.css";
import "./Profile.css";
import {get, post} from "../../../utilities.js";

const Profile  = (props) => {
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Profile Page";
        get(`/api/user`, { googleID: props.userID }).then((user) => {
            setUser(user.name);
        })
    }, []);
    // getting user data!

    // i want to die! :)
    if (!user) {
        return (<div> Log in before you can view your profile! </div>)
    }
    return (
        <div className="Profile-container">
            <div className="Avatar-container">
                <Avatar />
            </div>
            <h1 className="Profile-username">{user.name}</h1>
            <hr />
            <EditProfile />
        </div>
    );
};

export default Profile;