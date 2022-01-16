import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import Avatar from "../Avatar/Avatar.js";

import "../../../utilities.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {get, post} from "../../../utilities.js";

const EditProfile = (props) => {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        get("/api/whoami").then((user) => {
        if (user._id) {
            // they are registed in the database, and currently logged in.
            setUser(user);
        }
        });
    }, [])

    const [avatarList, setAvatarList] = useState([]);
        useEffect(() => {
            if (user) {
                get("/api/useravatar", {
                googleID: user.googleID,
                }).then((profile) => {
                setAvatarList(user.avatarNames);
                });
            }
        }, []);

// get list of all avatars owned by the user (?)

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
                            <h3>Available Avatars</h3>
                            {avatarList
                                .map((user, i) => (
                                <Avatar
                                    key={i}
                                    user={user}
                                />
                                ))}
                        </span>
                    </Popup>
                    <Popup
                        trigger={<button className="EditProfile-button"> Change Display Name </button>}
                        position="center"
                        nested
                    >
                        <span>
                        insert change name button here :thumbsup:
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