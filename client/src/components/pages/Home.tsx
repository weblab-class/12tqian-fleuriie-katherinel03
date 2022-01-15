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

type Props = RouteComponentProps & {
	userId: String;
	handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
	handleLogout: () => void;
};

const GOOGLE_CLIENT_ID = "714676168299-boi39i597g1mjus8btj5khnp6q8tic4k.apps.googleusercontent.com";

const Home = (props: Props) => {
	return (
		<div>
			<h1 className="Introduction">welcome to websitename, a tool built to help you build and maintain relationships!</h1>
			<div>
				{props.userId ? (
       				<GoogleLogout
          			clientId={GOOGLE_CLIENT_ID}
          			buttonText="Logout"
          			onLogoutSuccess={props.handleLogout}
          			onFailure={() => console.log(`Failed to logout.`)}
    			/>
      			) : (
        			<GoogleLogin
          			clientId={GOOGLE_CLIENT_ID}
					buttonText="start planting!"
					onSuccess={props.handleLogin}
					onFailure={(err) => console.log(err)}
        		/>
        		)}
			</div>
		</div>
		
	)
};

export default Home;