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

const GOOGLE_CLIENT_ID = "714676168299-nil4moo5m1o2q1v79lq9rnloep1jn5uh.apps.googleusercontent.com";
const Home = ({ userId, handleLogin, handleLogout }) => {
	return (
		// we should get rid of navbar on homepage
		<div className="Home-background">
			<h1 className="Home-introduction">
				welcome to flowerfriends, a tool built to help you build and maintain relationships! 
				add your friends as flowers and watch your relationship grow as you log time spent with them :)
			</h1>
			<div>
				{userId ? (
					<GoogleLogout
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Logout"
						onLogoutSuccess={handleLogout}
						onFailure={(err) => console.log(err)}
						render={(renderProps) => {
							return(
								<button
									onClick={renderProps.onClick}
									className = "Home-googleButton">
								logout
								</button>
							)
						}}
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
						render={(renderProps) => {
							return(
								<button
									onClick={renderProps.onClick}
									className = "Home-googleButton">
								log in with google
								</button>
							)
						}}
					/>
				)}
			</div>
		</div>

	)
};

export default Home;