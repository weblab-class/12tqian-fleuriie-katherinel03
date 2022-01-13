import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Link to="/" className="RegisterButton">
        start planting!
      </Link>
    </div>
  )
};

export default Home;