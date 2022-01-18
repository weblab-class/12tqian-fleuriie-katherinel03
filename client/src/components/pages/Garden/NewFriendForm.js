import React, { useEffect, useState, Component } from "react";

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import { post, get } from "../../../utilities.js";
import Alert from 'react-popup-alert';

const NewFriendForm = (props) => {
	const { handleSubmit, control } = useForm();

	const [alert, setAlert] = React.useState({
		type: 'error',
		text: 'This is a alert message',
		show: false
	})

	function onCloseAlert() {
		setAlert({
			type: '',
			text: '',
			show: false
		})
	}

	function onShowAlert(type) {
		setAlert({
			type: type,
			text: 'pls fill out all form thx',
			show: true
		})
	}


	const onSubmit = (data, e) => {
		const otherName = data.otherName;
		const otherID = data.otherID;
		const goalFrequency = Number(data.goalFrequency);
		if (goalFrequency !== undefined && !Number.isInteger(goalFrequency) && goalFrequency > 0) {
			onShowAlert("success");
		} else if (otherName !== undefined && otherID !== undefined && goalFrequency !== undefined) {
			// trying to add an existing user
			get("/api/user", {
				googleID: otherID,
			}).then((user) => {
				if (!user) {
					onShowAlert("success"); // create new alert later
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
		} else if (otherName !== undefined && otherID === undefined && goalFrequency !== undefined) {
			// trying to add a user who doesn't exist via name
			const otherGoogleID = props.userGoogleID + "__GAP__" + otherName;
			post("/api/userprofile", {
				googleID: otherGoogleID,
				currentAvatarID: 0,
				currency: 0,
				userName: otherName,
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
			onShowAlert("success");
		}
	};

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					Enter new frond pls
				</div>
				<Controller
					control={control}
					name="otherName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="frond name" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					Enter new frond code pls
				</div>
				<Controller
					control={control}
					name="otherID"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="frond code" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					Enter new frond code pls
				</div>
				<Controller
					control={control}
					name="goalFrequency"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="goalFrequency" style={{ width: 400 }}
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
			/>
		</div>

	);
}

export default NewFriendForm;