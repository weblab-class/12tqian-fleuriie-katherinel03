import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import Avatar from "../Avatar/Avatar.js";
import EditProfile from "./EditProfile.js";
import OtherStats from "./OtherStats.js";

import "../../../utilities.css";
import "./Profile.css";
import { get, post } from "../../../utilities.js";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUser(user);
      }
    });
  }, [])
  
  const [avatar, setAvatar] = useState(undefined);
  useEffect(() => {
    if (user) {
      get("/api/userprofile", {
        googleID: user.googleID,
      }).then((profile) => {
        setAvatar(<Avatar avatarID={profile.currentAvatarID} width={100} />);
      });
    }
  }, [user]);
  if (!user) {
    return (<div className="Profile-notLoggedIn"> Log in before you can view your profile! </div>)
  }
  return (
    <div className="Profile-container">
      <div className="Profile-avatarContainer">
        {avatar}
      </div>
      <h1 className="Profile-username">{user.name}</h1>
      <EditProfile />
    </div>
  );
};

export default Profile;