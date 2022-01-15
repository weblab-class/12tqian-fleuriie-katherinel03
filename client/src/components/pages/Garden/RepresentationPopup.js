import React, { useEffect, useState, Component } from "react";

import Popup from 'reactjs-popup';
import NewActivityPopup from "./Representation/NewActivityPopup";

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
					<div className="header"> Modal Title </div>
					<div className="content">
						naururrf
						<NewActivityPopup userGoogleID={props.userGoogleID} otherGoogleID={props.otherGoogleID} />
					</div>
					<div className="actions">
						<Popup
							trigger={<button className="button"> Trigger </button>}
							position="top center"
							nested
						>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
								magni omnis delectus nemo, maxime molestiae dolorem numquam
								mollitia, voluptate ea, accusamus excepturi deleniti ratione
								sapiente! Laudantium, aperiam doloribus. Odit, aut.
							</span>
						</Popup>
						<button
							className="button"
							onClick={() => {
								console.log('modal closed ');
								close();
							}}
						>
							close modal
						</button>
					</div>
				</div>
			)}
		</Popup>
	);
};

export default RepresentationPopup;