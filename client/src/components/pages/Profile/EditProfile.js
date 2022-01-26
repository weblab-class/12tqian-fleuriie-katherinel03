import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./EditProfile.css";
import { Button, DatePicker, Input } from 'antd';

import "../../../utilities.css";
import 'reactjs-popup/dist/index.css';
import { get, post } from "../../../utilities.js";
import 'react-popup-alert/dist/index.css'
import Alert from 'react-popup-alert';

const EditProfile = (props) => {
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
		});
		window.location.reload(false);	
	}

	function onShowSuccessAlert(type, text) {
		setSuccessAlert({
			type: type,
			text: text,
			show: true
		})
	}
	
	const onError = (errors, e) => {
		console.log(errors, e);
	};

	const isEmpty = (data) => {
		if (data === undefined || String(data).length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmit = (data, e) => {
		const name = data.newName;
		if (isEmpty(name)) {
			onShowErrorAlert("invalidSubmission", "Your name is empty.\n");
		} else {
			post("/api/userprofileupdate",
			{
				userProfile: {
					googleID: props.googleID,
				},
				update: {
					userName: name,
				},
			}).then((data) => {
				onShowSuccessAlert("validSubmission", "Successfully changed your name!");
			});
		}
	};
	return (
		<div className="activities2">
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className="new-text">
					Change your name:
				</div>
				<Controller
					control={control}
					name="newName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="New Name" style={{ width: 200 }} className="activity-text"
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
					<input className="submit-button5" type="submit" />
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
};

export default EditProfile;