import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar.js";
import EditProfile from "./EditProfile.js";
import UserStats from "./UserStats.js";
import UserAchievement from "./UserAchievements.js";

import "../../../utilities.css";
import "./Profile.css";
import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [code, setCode] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUser(user);
      }
    });
  }, [])

  const [avatar, setAvatar] = useState(undefined);

  const resetUser = () => {
    if (user) {
      get("/api/userprofile", {
        googleID: user.googleID,
      }).then((profile) => {
        setAvatar(<Avatar avatarID={profile.currentAvatarID} width="25%" />);
        setUserName(profile.userName);
        setCode(user.googleID);
      });
    }
  };

  useEffect(() => {
    socket.on("newUserProfileUpdate", resetUser);
    return () => {
      socket.off("newUserProfileUpdate", resetUser);
    };
  });

  useEffect(() => {
    resetUser();
  }, [user]);

  if (!user) {
    return (<div className="Profile-notLoggedIn"> Please login to view your profile. </div>)
  }
  return (
    <div className="Profile-container">
      <div className="Profile-inner-container">
        <div className="Profile-leftColumn">
          <div className="stats-container">
            <UserStats googleID={user.googleID} />
          </div>
        </div>
        <div className="Profile-centerColumn">
          <div className="Profile-avatarContainer">
            {avatar}
          </div>
          <h1 className="Profile-username">{userName}</h1>
          <EditProfile googleID={user.googleID} />
          <div className="friend-box">
            <div className="friendCodeBox">
              Your friend code: <h3>{code}</h3>
            </div>
          </div>
        </div>
        <div className="Profile-rightColumn">
          <div className="achievements-container">
            <UserAchievement user={user} googleID={user.googleID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;