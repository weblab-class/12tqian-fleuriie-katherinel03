import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, DatePicker, Input } from 'antd';

import { get, post } from "../../../../utilities";
import 'reactjs-popup/dist/index.css';
import 'react-popup-alert/dist/index.css'
import Alert from 'react-popup-alert';

const EditPairName = (props) => {
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
			onShowErrorAlert("invalidSubmission", "Friend's name is empty.\n");
		} else {
			get("/api/pairprofilename", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
				pairName: name,
			}).then((pairProfiles) => {
				if (pairProfiles.length !== 0) {
					onShowErrorAlert("invalidSubmission", "You already have a friend with that name.\n");
				} else {
					post("/api/pairprofileupdate",
					{
						pairProfile: {
							userGoogleID: props.userGoogleID,
							otherGoogleID: props.otherGoogleID,
						},
						update: {
							pairName: name,
						},
					}).then((data) => {
						onShowSuccessAlert("validSubmission", "Successfully changed friend's name!");
					});
				}
			});
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					Change friend name
				</div>
				<Controller
					control={control}
					name="newName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="New Name" style={{ width: 400 }}
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
};

export default EditPairName;