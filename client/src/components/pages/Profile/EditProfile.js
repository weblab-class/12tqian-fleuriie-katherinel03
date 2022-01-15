import React, { useEffect, useState } from "react";

import "./EditProfile.css";

import "../../../utilities.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {get, post} from "../../../utilities.js";

const EditProfile = (props) => {
    
    return (
        <div>
            <Popup trigger={<button> Edit Profile </button>} position="center">
                <div>Popup content here!</div>
            </Popup>
        </div>
    );
};

export default EditProfile;