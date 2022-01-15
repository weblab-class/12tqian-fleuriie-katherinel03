import React, { useEffect, useState } from "react";

import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const Username = (props) => {
    const [username, setUsername] = useState([]);

    // get username from server

    useEffect(() => {
        get("/api/user", { googleID: props.googleID }.then((user) => {
            setUsername(user.name);
        }))
    }, []);

    return (
        <div>
            { username }
        </div>
    );
};

export default Username;