import React, { useEffect, useState, Component } from "react";

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import { post, get } from "../../../utilities.js";
import Alert from 'react-popup-alert';
import { isUndefined } from "util";

const NewFriendForm = (props) => {
	const { handleSubmit, control } = useForm();

	const [errorAlert, setErrorAlert] = React.useState({
		type: 'error',
		text: 'This is a error message.',
		show: false,
	});

	const [successAlert, setSuccessAlert] = React.useState({
		type: "success",
		text: "This is a success message.",
		show: false,
	});

	function onCloseErrorAlert() {
		setErrorAlert({
			type: '',
			text: '',
			show: false
		})
	}

	function onShowErrorAlert(type, text) {
		setErrorAlert({
			type: type,
			text: text,
			show: true
		})
	}

	function onCloseSuccessAlert() {
		setSuccessAlert({
			type: '',
			text: '',
			show: false
		})
	}

	function onShowSuccessAlert(type, text) {
		setSuccessAlert({
			type: type,
			text: text,
			show: true
		})
	}

	const isEmpty = (item) => {
		if (item === undefined || item.length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmit = (data, e) => {
		const otherName = data.otherName;
		let errorText = "";
		let otherID = data.otherID;
		let goalFrequency = data.goalFrequency;
		if (isNaN(goalFrequency) || !Number.isFinite(Number(goalFrequency)) || Number(goalFrequency) <= 0) {
			errorText += "The goal frequency should be a positive integer!\n";
		} else if (!isEmpty(otherID) && isNaN(otherID)) {
			errorText += "The friend code you entered is invalid!\n";
		} else {
			goalFrequency = Number(data.goalFrequency);
			if (!isEmpty(otherName) && !isEmpty(otherID)) {
				otherID = Number(otherID);
				// trying to add an existing user
				get("/api/user", {
					googleID: otherID,
				}).then((user) => {
					if (!user) {
						errorText += "You tried to reference a user code that doesn't exist in the system yet!\n";
					} else {
						post("/api/pairprofile", {
							userGoogleID: props.userGoogleID,
							otherGoogleID: otherID,
							currentRepresentationID: 0,
							totalExperience: 0,
							goalFrequency: goalFrequency,
							pairName: otherName,
						});
						post("/api/pairrepresentation", {
							userGoogleID: props.userGoogleID,
							otherGoogleID: otherID,
							representationID: 0,
						});
					}
				});
			} else if (!isEmpty(otherName) && isEmpty(otherID)) {
				const otherGoogleID = props.userGoogleID + "__GAP__" + otherName;
				post("/api/userprofile", {
					googleID: otherGoogleID,
					currentAvatarID: 0,
					currency: 0,
					userName: otherName,
				});
				post("/api/useravatar", {
					googleID: otherGoogleID,
					avatarID: 0,
				});
				post("/api/pairprofile", {
					userGoogleID: props.userGoogleID,
					otherGoogleID: otherGoogleID,
					currentRepresentationID: 0,
					totalExperience: 0,
					goalFrequency: goalFrequency,
					pairName: otherName,
				});
				post("/api/pairrepresentation", {
					userGoogleID: props.userGoogleID,
					otherGoogleID: otherGoogleID,
					representationID: 0,
				});
			} else {
				errorText += "You didn't add a name for your friend!\n";
			}
		}
		if (errorText.length != 0) {
			onShowErrorAlert("invalidSubmission", errorText);
		} else {
			onShowSuccessAlert("validSubmission", "You have succecssfully added a new friend!");
		}
	}

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					Name for new friend:
				</div>
				<Controller
					control={control}
					name="otherName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Name" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					Friend code if you have one (or leave blank if you don't have one):
				</div>
				<Controller
					control={control}
					name="otherID"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Code" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					You want at most this many days between interactions with your friend:
				</div>
				<Controller
					control={control}
					name="goalFrequency"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Goal frequency" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<input type="submit" />
			</form>
			<Alert
				header={'Error in submission'}
				btnText={'Close'}
				text={errorAlert.text}
				type={errorAlert.type}
				show={errorAlert.show}
				onClosePress={onCloseErrorAlert}
				pressCloseOnOutsideClick={true}
				showBorderBottom={true}
				alertStyles={{}}
				headerStyles={{}}
				textStyles={{}}
				buttonStyles={{}}
			/>
			<Alert
				header={'Success!'}
				btnText={'Close'}
				text={successAlert.text}
				type={successAlert.type}
				show={successAlert.show}
				onClosePress={onCloseSuccessAlert}
				pressCloseOnOutsideClick={true}
				showBorderBottom={true}
				alertStyles={{}}
				headerStyles={{}}
				textStyles={{}}
				buttonStyles={{}}
			/>
		</div>

	);
}

export default NewFriendForm;