import React, { useEffect, useState } from "react";

import NewFriendForm from "./NewFriendForm.js";
import Popup from 'reactjs-popup';
import "./NewPairPopup.css";
import HelpButton from '/client/src/components/modules/HelpButton.js';

const NewPairPopup = (props) => {

	return (
		<div className="add-friend-container">
			<Popup
				trigger={<button className="add-friend-button">Add new friend!</button>}
				modal
				nested
			>
				{close => (
					<div className="modal">
						<button className="close" onClick={close}>
							&times;
						</button>
						<div className="new-header"> New Friend <HelpButton 
					helpHeader={'Adding new friends'}
					helpDescription={'To add a new friend, input the name of your friend, their friend code if they have an account with us already (friend code can be found at the bottom of your profile page), and the number of days you want between interactions with them. Once you have made your friends, you can log new activities by clicking on their names!'}
					/>
					</div>
						<div className="content">
							<NewFriendForm userGoogleID={props.userGoogleID} />
						</div>
					</div>
				)}
			</Popup>
		</div>
	);
};

export default NewPairPopup;