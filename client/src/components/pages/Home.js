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

<<<<<<< HEAD
// const GOOGLE_CLIENT_ID = "591152966434-capsaasb8625fhqqbmpnudssj9n8t2p0.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID = "714676168299-nil4moo5m1o2q1v79lq9rnloep1jn5uh.apps.googleusercontent.com";

=======
const GOOGLE_CLIENT_ID = "714676168299-nil4moo5m1o2q1v79lq9rnloep1jn5uh.apps.googleusercontent.com";
>>>>>>> 69f4a4e5c53bd38459b6acf988b840e0b45621f5

const Home = ({ userId, handleLogin, handleLogout }) => {
	return (
		<div className="Home-background">
			<div className="Home-plantIconContainer">
				<div className="Home-plantIcon" />
			</div>
			<h1 className="Home-introduction">welcome to flowerfriends, a tool built to help you build and maintain relationships!</h1>
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
		</div>

	)
};

export default Home;