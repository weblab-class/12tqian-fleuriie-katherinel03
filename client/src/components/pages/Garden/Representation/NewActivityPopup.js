import React, { useEffect, useState, Component } from "react";
import { Fireworks } from 'fireworks/lib/react'

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import { post, get } from "../../../../utilities.js";
import Alert from 'react-popup-alert';
import "./NewActivityPopup.css"

import {
	EXPERIENCE_PER_ACTIVITY,
	CURRENCY_PER_LEVEL,
	formatTime,
	EXPERIENCE_LEVEL_MULTIPLIER,
	CURRENCY_LEVEL_MULTIPLIER,
	MULTIPLIER_LOW,
	MULTIPLIER_HIGH,
	getLevel
} from "../../../constants/constants.js";

const NewActivityPopup = (props) => {
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

	const isEmpty = (data) => {
		if (data === undefined || String(data).length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const genRand = (min, max, decimalPlaces) => {
		var rand = Math.random() * (max - min) + min;
		var power = Math.pow(10, decimalPlaces);
		return Math.floor(rand * power) / power;
	}

	const onSubmit = (data, e) => {
		const activityTime = new Date(data.activityTime);
		const activityName = data.activityName;
		if (isEmpty(data.activityTime) || isEmpty(data.activityName)) {
			onShowErrorAlert("invalidSubmission", "Either the date or the activity description was empty.\n");
		} else {
			post("/api/pairactivity", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
				activityName: activityName,
				activityTime: activityTime,
			}).then((data) => {
				console.log(data);
			});
			get("/api/userprofile", {
				googleID: props.userGoogleID,
			}).then((userProfile) => {
				get("/api/pairprofileone", {
					userGoogleID: props.userGoogleID,
					otherGoogleID: props.otherGoogleID,
				}).then((pairProfile) => {
					let currencyGained = CURRENCY_PER_LEVEL
						+ CURRENCY_LEVEL_MULTIPLIER * getLevel(pairProfile.totalExperience);
					currencyGained = currencyGained * genRand(MULTIPLIER_LOW, MULTIPLIER_HIGH, 2);
					currencyGained = Math.round(currencyGained);
					let experienceGained = EXPERIENCE_PER_ACTIVITY
						+ EXPERIENCE_LEVEL_MULTIPLIER * getLevel(pairProfile.totalExperience);
					experienceGained = experienceGained * genRand(MULTIPLIER_LOW, MULTIPLIER_HIGH, 2);
					experienceGained = Math.round(currencyGained);
					post("/api/pairprofileupdate", {
						pairProfile: {
							userGoogleID: props.userGoogleID,
							otherGoogleID: props.otherGoogleID,
						},
						update: {
							totalExperience: pairProfile.totalExperience + experienceGained,
						},
					});

					post("/api/userprofileupdate", {
						userProfile: {
							googleID: props.userGoogleID,
						},
						update: {
							currency: userProfile.currency + currencyGained,
						},
					});
					const messages = [];

					messages.push(<div>{"You have successfully added an activity!"}</div>);
					messages.push(<div>{"Your plant gained " + String(experienceGained) + " experience!"}</div>);
					messages.push(<div>{"You gained " + String(currencyGained) + " currency!"}</div>);
					if (getLevel(pairProfile.totalExperience) !== getLevel(pairProfile.totalExperience + experienceGained)) {
						messages.push(<div>{"Your plant became level "
							+ String(getLevel(pairProfile.totalExperience + experienceGained))
							+ "!"}</div>);
					}
					onShowSuccessAlert("validSubmission", <div>{messages}</div>);
				});
			});
		}
	};

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div>
			<div className="activities">
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<div >
						<div className="new-text">Enter new activities!</div>
					</div>
					<Controller
						control={control}
						name="activityTime"
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<DatePicker placeholder="select date" onChange={onChange} className="activity-text"
								onBlur={onBlur}
								selected={value} />
						)}
					/>
					<Controller
						control={control}
						name="activityName"
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<Input placeholder="activity description (90 char. max)" style={{ width: 300 }} className="activity-text"
								onChange={onChange}
								onBlur={onBlur}
								selected={value} />
						)}
					/>
					<input type="submit" className="submit-button4"/>
				</form>
			</div>
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

export default NewActivityPopup;