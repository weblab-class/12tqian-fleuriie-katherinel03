import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
	GoogleLogout,
} from "react-google-login";

import "./NavBar.css";
import { RouteComponentProps } from "@reach/router";

/**
 * The navigation bar at the top of all pages. Has a login button on the right.
 */
 const GOOGLE_CLIENT_ID = "714676168299-nil4moo5m1o2q1v79lq9rnloep1jn5uh.apps.googleusercontent.com";

 const NavBar = ({ userId, handleLogin, handleLogout }) => {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">flowerfriends</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          <Link to="/profile/" className="NavBar-link">
            Profile
          </Link>
          <Link to="/garden/" className="NavBar-link">
            Garden
          </Link>
          <Link to="/shop/" className="NavBar-link">
            Shop
          </Link>
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
									className = "NavBar-googleButton">
								Logout
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
            render={(renderProps) => {
							return(
								<button
									onClick={renderProps.onClick}
									className = "NavBar-googleButton">
								Login
								</button>
							)
						}}
					/>
				)}
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  