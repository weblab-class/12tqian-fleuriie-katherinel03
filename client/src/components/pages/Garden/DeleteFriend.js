import React from "react";

import { get, post } from "../../../utilities";
import "./DeleteFriend.css";

const DeleteFriend = (props) => {
	const clearAPI = () => {
		if (props.otherGoogleID.includes("__GAP__")) {
			post("/api/userprofiledelete", {
				googleID: props.otherGoogleID,
			});
		} else {
		}
		post("/api/pairactivitydelete", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		});
		post("/api/pairrepresentationdelete", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		});
		post("/api/pairprofiledelete", {
			userGoogleID: props.userGoogleID,
			otherGoogleID: props.otherGoogleID,
		});
	};

	const onSubmit = () => {
		clearAPI();
	};

	return (
		<div className='container'>
			<button className="submit-button3" onClick={onSubmit}>Remove friend</button>
		</div>
	);
};

export default DeleteFriend;