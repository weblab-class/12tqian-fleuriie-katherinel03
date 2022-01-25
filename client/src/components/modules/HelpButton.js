import React from "react";

import 'react-popup-alert/dist/index.css'
import Alert from 'react-popup-alert';
import { useForm, Controller } from "react-hook-form";

import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

// helpHeader - header at top
// helpDescription - description for header
// buttonText - button text jk this doesn't happen

const HelpButton = (props) => {
	const { handleSubmit, control } = useForm();

	const [successAlert, setSuccessAlert] = React.useState({
		type: "success",
		text: "This is a success message.",
		show: false,
	});

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

	const successFriend = () => {
		onShowSuccessAlert("validSubmission", props.helpDescription);
	};

	return (
		<div>
			<Button type="primary" shape="round" onClick={() => { successFriend(); }} size="small">
				?
				{/* {props.buttonText} */}
			</Button>
			<Alert
				header={props.helpHeader}
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

export default HelpButton;