import React, { useEffect, useState } from "react";

import "./EditProfile.css";

import "../../../utilities.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {get, post} from "../../../utilities.js";

const EditProfile = (props) => {

    return (
        <div>
            <Popup
                trigger={<button className="EditProfile-button"> Edit Profile </button>}
                modal
                nested
            >
                {close => (
                <div className="EditProfile-background">
                    <div className="EditProfile-header"> Edit Profile </div>
                    <div className="EditProfile-content">
                    {' '}
                    Which part of your profile would you like to edit?
                    </div>
                    <div className="EditProfile-actions">
                    <Popup
                        trigger={<button className="EditProfile-button"> Change Avatar </button>}
                        position="top center"
                        nested
                    >
                        <span>
                        make this thingy what happens when you want to change avatar :thumbsup:
                        </span>
                    </Popup>
                    <Popup
                        trigger={<button className="EditProfile-button"> Change Display Name </button>}
                        position="center"
                        nested
                    >
                        <span>
                        make this thingy what happens when you want to change name :thumbsup:
                        </span>
                    </Popup>
                    <button
                        className="EditProfile-button"
                        onClick={() => {
                        console.log('modal closed');
                        close();
                        }}
                    >
                        Return to Profile
                    </button>
                    </div>
                </div>
                )}
            </Popup>
        </div>
    );
};

export default EditProfile;