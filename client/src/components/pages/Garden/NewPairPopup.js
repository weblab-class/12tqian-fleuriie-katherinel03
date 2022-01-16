import React, { useEffect, useState } from "react";

import NewFriendForm from "./NewFriendForm.js";
import Popup from 'reactjs-popup';

const NewPairPopup = (props) => {

	return (
		<div>
			<Popup
				trigger={<button className="button">Add new friend!</button>}
				modal
				nested
			>
				{close => (
					<div className="modal">
						<button className="close" onClick={close}>
							&times;
						</button>
						<div className="header"> New Friend </div>
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