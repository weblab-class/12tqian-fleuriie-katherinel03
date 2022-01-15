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

  // useEffect(() => {
  //   document.title = "Profile Page";
  //   get(`/api/user`, { googleID: user.googleID }).then((user) => {
  //     setUser(user.name);
  //   })
  // }, []);
  const [avatar, setAvatar] = useState(undefined);
  useEffect(() => {
    if (user) {
      get("/api/userprofile", {
        googleID: user.googleID,
      }).then((profile) => {
        setAvatar(<Avatar avatarName={profile.currentAvatar} width={100} />);
      });
    }
  }, [user]);
  // // getting user data!

  // // i want to die! :)
  if (!user) {
    return (<div> Log in before you can view your profile! </div>)
  }
  return (
    <div className="Profile-container">
      <div className="Avatar-container">
        {avatar}
      </div>
      <h1 className="Profile-username">{user.name}</h1>
      <hr />
      <EditProfile />
    // </div>
  );
};

export default Profile;