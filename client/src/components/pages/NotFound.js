import React from "react";
import { Link } from "@reach/router";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound-container">
      <div className="heading">404 Not Found
      <div>The page you requested couldn't be found :(
        <br />
      <Link to="/">
            Return to home?
      </Link>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
