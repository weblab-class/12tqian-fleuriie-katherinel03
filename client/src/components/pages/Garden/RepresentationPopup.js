import React, { useEffect, useState, Component } from "react";

import Collapsible from 'react-collapsible';

import Popup from 'reactjs-popup';
import PairInteractionPopup from "./PairInteractionPopup";
import "./RepresentationPopup.css";
import HelpButton from '/client/src/components/modules/HelpButton.js';


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
					<div className="pair-interaction-header"> Pair Interaction
						<div className="help-button-div">
							<HelpButton
								helpHeader={'Logging activities'}
								helpDescription={'Congrats on making a friend! As you log activities with them, the plant symbolizing your relationship will grow and level up, earning you money to buy customization options with. At levels 5 and 10, you will unlock a special new appearance for your plant! You can also switch to different plants by clicking the change plant button. If you want to delete this friend, scroll down to the bottom of the popup and click the Remove Friend button!'}
							/>
						</div>
					</div>
					<div className="content">
						<PairInteractionPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					</div>
				</div>
			)}
		</Popup>
	);
};

export default RepresentationPopup;