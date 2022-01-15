import React, { useEffect, useState, Component } from "react";

import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import 'react-popup-alert/dist/index.css'
import {post, get} from "../../../../utilities.js";
import Alert from 'react-popup-alert';

const NewActivityPopup = (props) => {
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
		const activityTime = new Date(data.activityTime);
		const activityName = data.activityName;
		console.log(activityTime);
		console.log(data.activityName);
		if (data.activityTime === undefined || data.activityName === undefined) {
			onShowAlert("success");
		} else {
			post("/api/pairactivity", {
				userGoogleID: props.userGoogleID,
				otherGoogleID: props.otherGoogleID,
				activityName: activityName, 
				activityTime: activityTime,
			}).then((data) => {
				console.log(data);
			});
		}
	};

	const onError = (errors, e) => {
		console.log(errors, e);
	};

	return (
		<div>

			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<Controller
					control={control}
					name="activityTime"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<DatePicker placeholder="select date" onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<Controller
					control={control}
					name="activityName"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Basic usage" style={{ width: 400 }}
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

export default NewActivityPopup;