import React from "react";

import { get, post } from "../../../utilities";
import "./DeleteFriend.css";



const DeleteFriend = (props) => {
	const deleteFriendAchievement = () => {
		console.log("CHECKING");
		get("/api/userachievement", {
			googleID: props.userGoogleID,
		}).then((achievements) => {
			let inside = 0;
			for (const obj of achievements) {
				if (obj.achievementID === 19) {
					inside = 1;
					break;
				}
			}
			if (inside === 0) {
				post("/api/userachievement", {
					googleID: props.userGoogleID,
					achievementID: 19,
					achievementDate: String(new Date()),
				});
			}
			window.location.reload(false);
		});
	};

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
		deleteFriendAchievement();
	};

	return (
		<div className='container'>
			<button className="submit-button3" onClick={onSubmit}>Remove friend</button>
		</div>
	);
};

export default DeleteFriend;