import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";
import {get, post} from "../../utilities.js";

const Profile  = (props) => {
    get("/api/user", {
        name: "",
        googleID: "",
    })
    get("/api/useravatar", {
        googleID: "",
        avatarNames: [""],
    })
    get("/api/userprofile", {
        googleID: "",
        currentAvatar: "",
        currency: "",
    })
    get("/api/userachievement", {
        googleID: "",
        achievementName: "",
    })

    return (
        <div>
            help
        </div>
    )
    /* kat's old code

    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        document.title = "Profile Page";
        get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }, []);

    if (!user) {
        return (<div> Loading! </div>);
    }
    return (
        <div className="profileBackground">
            <div className="Profile-avatarContainer">
                <div className="Profile-avatar" />
            </div>
            <h1 className="Profile-username u-textCenter">
                {user.username}
            </h1>
        </div>
    ) */
}

export default Profile;

/* 
code from garden to use as reference

    const Garden = (props) => {
  post("/api/pairactivity", {
    userGoogleID: "user1",
    otherGoogleID: "user2",
    activityName: "league",
    activityTime: new Date(),
  }).then((activity) => {
    console.log(activity);
  });
  post("/api/pairactivity", {
    userGoogleID: "user1",
    otherGoogleID: "user2",
    activityName: "died",
    activityTime: new Date(),
  }).then((activity) => {
    console.log(activity);
  });
  get("/api/pairactivity", {
    userGoogleID: "user1",
    otherGoogleID: "user2"
  }).then((data) => {
    console.log(data);
  }); */