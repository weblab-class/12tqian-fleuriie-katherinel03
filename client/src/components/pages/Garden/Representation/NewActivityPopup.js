import React, { useEffect, useState, Component } from "react";

import ReactDatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const NewActivityPopup = (props) => {
	const { handleSubmit, control } = useForm();

	return (
		<form onSubmit={handleSubmit(data => console.log(data))}>
			<Controller
				control={control}
				name="ReactDatepicker"
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<ReactDatePicker
						onChange={onChange}
						onBlur={onBlur}
						selected={value}
					/>
				)}
			/>
			<input type="submit" />
		</form>
	);
}

export default NewActivityPopup;