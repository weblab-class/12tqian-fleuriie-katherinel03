import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";

type Props = RouteComponentProps & {};

const Home = (Props) => {
	return (
		<div>
			<Link to="/" className="RegisterButton">
				start planting!
			</Link>
		</div>
	)
};

export default Home;