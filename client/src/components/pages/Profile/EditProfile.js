import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./EditProfile.css";
import Avatar from "../Avatar/Avatar.js";

import "../../../utilities.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { get, post } from "../../../utilities.js";
import Alert from 'react-popup-alert';
import { Button, DatePicker, Input } from 'antd';

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

	// this bottom stuff is wip trying to change username !!

	//     const { handleSubmit, control } = useForm();
	// const [alert, setAlert] = React.useState({
	// 		type: 'error',
	// 		text: 'This is a alert message',
	// 		show: false
	// 	})

	// 	function onCloseAlert() {
	// 		setAlert({
	// 			type: '',
	// 			text: '',
	// 			show: false
	// 		})
	// 	}

	// 	function onShowAlert(type) {
	// 		setAlert({
	// 			type: type,
	// 			text: 'Please fill in what you would like to change your name to!',
	// 			show: true
	// 		})
	// 	}

	// 	const onSubmit = (data, e) => {
	// 		const newName = data.newName
	// 		if (goalFrequency !== undefined && !Number.isInteger(goalFrequency) && goalFrequency > 0) {
	// 			onShowAlert("success");
	// 		} else if (otherName !== undefined && otherID !== undefined && goalFrequency !== undefined) {
	// 			// trying to add an existing user
	// 			get("/api/user", {
	// 				googleID: otherID,
	// 			}).then((user) => {
	// 				if (!user) {
	// 					onShowAlert("success"); // create new alert later
	// 				} else {
	// 					post("/api/user", {
	// 						name: newName,
	//                         googleID: props.googleID,
	// 					});
	// 				}
	// 			});
	// 		} 
	// 	};

	// 	const onError = (errors, e) => {
	// 		console.log(errors, e);
	// 	};

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
									{/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
									<div>
										What would you like to change your name to? (THIS IS WIP!)
									</div>
									{/* <Controller
                                    control={control}
                                    name="newName"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Input placeholder="new name" style={{ width: 400 }}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            selected={value} />
                                    )}
                                />
                                <input type="submit" />
                            </form>
                            <Alert
                                header={'Header'}
                                btnText={'Close'}
                                text={alert.text}
                                type={alert.type}
                                show={alert.show}
                                onClosePress={onCloseAlert}
                                pressCloseOnOutsideClick={true}
                                showBorderBottom={true}
                                alertStyles={{}}
                                headerStyles={{}}
                                textStyles={{}}
                                buttonStyles={{}}
                            /> */}
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