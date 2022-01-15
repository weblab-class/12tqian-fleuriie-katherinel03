import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";

const Profile  = (props) => {
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
        <>
            <div className="Profile-avatarContainer">
                <div className="Profile-avatar" />
            </div>
            <h1 className="Profile-username u-textCenter">
                {user.username}
            </h1>
        </>
    )
}

export default Profile;