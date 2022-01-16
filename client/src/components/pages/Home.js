import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
	GoogleLogout,
} from "react-google-login";

import "../../utilities.css";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";

const GOOGLE_CLIENT_ID = "714676168299-boi39i597g1mjus8btj5khnp6q8tic4k.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
	return (
		<div className="Home-background">
			<div className="Home-plantIconContainer">
				<div className="Home-plantIcon" />
			</div>
			<h1 className="Home-introduction">welcome to Imagine Having Friends, a tool built to help you build and maintain relationships!</h1>
			<div>
				{userId ? (
					<GoogleLogout
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Logout"
						onLogoutSuccess={handleLogout}
						onFailure={(err) => console.log(err)}
						className="Home-googleButton"
					/>
				) : (
					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						buttonText="start planting!"
						onSuccess={handleLogin}
						onFailure={(err) => console.log(err)}
						cookiePolicy={'single_host_origin'}
						isSignedIn={true}
						className="Home-googleButton"
					/>
				)}
			</div>
			<div className="profileButton">
			{userId && (
				<Link to={`/profile/`} className="Home-profileLink">
					Profile
				</Link>
			)}
			</div>
		</div>

	)
};

export default Home;