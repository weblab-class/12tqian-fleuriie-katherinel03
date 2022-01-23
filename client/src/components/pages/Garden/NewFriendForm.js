import React, { useEffect, useState, Component } from "react";

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import { post, get } from "../../../utilities.js";
import Alert from 'react-popup-alert';
import './NewFriendForm.css';

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
		if (!isEmpty(otherName) && String(otherName).length > 20) {
			onShowErrorAlert("invalidSubmission", "Please keep your name less than or equal to 20 characters.\n");
		} else if (isNaN(goalFrequency) || !Number.isFinite(Number(goalFrequency)) || Number(goalFrequency) <= 0) {
			onShowErrorAlert("invalidSubmission", "The goal frequency should be a positive integer!\n");
		} else if (!isEmpty(otherID) && isNaN(otherID)) {
			onShowErrorAlert("invalidSubmission", "The friend code you entered is invalid.\n");
		} else {
			goalFrequency = Number(data.goalFrequency);
			if (isEmpty(otherName)) {
				onShowErrorAlert("invalidSubmission", "The name can't be empty.\n");
			} else {
				get("/api/pairprofilename", {
					userGoogleID: props.userGoogleID,
					pairName: otherName,
				}).then((pairProfiles) => {
					if (pairProfiles.length !== 0) {
						onShowErrorAlert("invalidSubmission", "You already have a friend with that name.\n");
					} else {
						if (!isEmpty(otherName) && !isEmpty(otherID)) {
							otherID = Number(otherID);
							// trying to add an existing user
							get("/api/user", {
								googleID: otherID,
							}).then((user) => {
								if (!user) {
									onShowErrorAlert("invalidSubmission", "You tried to reference a user code that doesn't exist in the system yet.\n");
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
									onShowSuccessAlert("validSubmission", "You have succecssfully added a new friend!");
								}
							});
						} else if (!isEmpty(otherName) && isEmpty(otherID)) {
							const otherGoogleID = props.userGoogleID + "__GAP__" + otherName;
							post("/api/userprofile", {
								googleID: otherGoogleID,
								currentAvatarID: 0,
								currentGardenID: 0,
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
							onShowSuccessAlert("validSubmission", "You have succecssfully added a new friend!");
						} else {
							onShowErrorAlert("invalidSubmission", "You didn't add a name for your friend!\n");
						}
					}
				});
			}
		}
	}

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div className="NewFriendForm-form">
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className="new-text">
					Name for new friend:
				</div>
				<Controller
					control={control}
					name="otherName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Name" style={{ width: 200 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div className="new-text">
					Friend code if you have one (or leave blank if you don't have one):
				</div>
				<Controller
					control={control}
					name="otherID"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Code (ask you friend for their code, which is located under their profile)	" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div className="new-text">
					You want at most this many days between interactions with your friend:
				</div>
				<Controller
					control={control}
					name="goalFrequency"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Goal frequency" style={{ width: 200 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					<input type="submit" />
				</div>
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