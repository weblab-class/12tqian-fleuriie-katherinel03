import React, { Component } from "react";

import "../../../../utilities.css";

import RepresentationAvatar from "./RepresentationAvatar.js";
import HealthBar from "./HealthBar.js";

/**
 * two things
 * userGoogleID
 * otherGoogleID
 */
const Representation = (props) => {
	
  return (
    <div>
      <HealthBar health={12} />
      <RepresentationAvatar avatarName="Representation" width={100} />
      <div style={{ textAlign: "center" }}>
        <span>
          Plant
        </span>
      </div>
    </div>
  );
};

export default Representation;