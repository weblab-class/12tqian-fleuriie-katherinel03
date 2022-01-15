import React, { useEffect, useState, Component } from "react";

import Popup from 'reactjs-popup';
import NewActivityPopup from "./Representation/NewActivityPopup";
import PairInteractionPopup from "./PairInteractionPopup";

const RepresentationPopup = (props) => {
	return (
		<Popup
			trigger={<button className="button"> Activity Details </button>}
			modal
			nested
		>
			{close => (
				<div className="modal">
					<button className="close" onClick={close}>
						&times;
					</button>
					<div className="header"> Pair Interaction </div>
					<div className="content">
						<PairInteractionPopup userGoogleID="user1" otherGoogleID="user2" />
					</div>
				</div>
			)}
		</Popup>
	);
};

export default RepresentationPopup;