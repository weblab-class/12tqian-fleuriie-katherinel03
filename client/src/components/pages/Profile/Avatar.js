import React, { useEffect, useState } from "react";

import "./Avatar.css";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const Avatar = (props) => {
    const [avatar, setAvatar] = useState([]);

    useEffect(() => {
        get("/api/userprofile", { googleID: "", currentAvatar: "", currency: "" }.then((avatar) => {
            setAvatar(avatar);
        }))
    }, []);
    
}