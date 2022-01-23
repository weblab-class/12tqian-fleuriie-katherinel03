import React, { useEffect, useState, Component } from "react";

import Collapsible from 'react-collapsible';

import Popup from 'reactjs-popup';
import PairInteractionPopup from "./PairInteractionPopup";
import "./RepresentationPopup.css";


const RepresentationPopup = (props) => {
	return (
		<Popup
			trigger={<button className="detail-button"> {props.otherName} </button>}
			modal
			nested
		>
			{close => (
				<div className="modal">
					<button className="close" onClick={close}>
						&times;
					</button>
					<div className="pair-interaction-header"> Pair Interaction </div>
					<div className="content">
						<PairInteractionPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					</div>
				</div>
			)}
		</Popup>
	);
};

export default RepresentationPopup;