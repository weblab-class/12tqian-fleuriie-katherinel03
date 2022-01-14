import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

import "../../../../utilities.css";

import RepresentationAvatar from "./RepresentationAvatar";
import HealthBar from "./HealthBar";

type Props = {

};

const Representation = (props: Props) => {
  return (
    <div>
      <HealthBar health={58} />
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
