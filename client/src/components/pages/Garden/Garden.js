import React, { Component } from "react";
import { socket } from "../../../client-socket";
import GoogleLogin, { GoogleLogout } from "react-google-login";

// import { drawCanvas } from "../../canvasManager";

import "../../../utilities.css";

// import "../../input";
// import "./Game.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

// testing code 
import Avatar from "../Avatar/Avatar.js";

import HealthBar from "./Representation/HealthBar";
// end testing code

const Garden = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )}
      <h1>Good luck on your project :)</h1>
      <h2> What you need to change in this skeleton</h2>
      <ul>
        <li>
          Change the Frontend CLIENT_ID (Skeleton.js) to your team's CLIENT_ID (obtain this at
          http://weblab.to/clientid)
        </li>
        <li>Change the Server CLIENT_ID to the same CLIENT_ID (auth.js)</li>
        <li>
          Change the Database SRV (mongoConnectionURL) for Atlas (server.js). You got this in the
          MongoDB setup.
        </li>
        <li>Change the Database Name for MongoDB to whatever you put in the SRV (server.js)</li>
      </ul>
      <h2>How to go from this skeleton to our actual app</h2>
      <a href="http://weblab.to/get-started">Check out this getting started guide</a>
      <HealthBar health="58" />
      <Avatar avatarName="Avatar" width="100" />
    </div>
  );
};

export default Garden;


// const Game = () => {
//   const [winner, setWinner] = useState(null);

//   useEffect(() => {
//     socket.on("update", (update) => {
//       processUpdate(update);
//     });
//   }, []);

//   const processUpdate = (update) => {
//     /** TODO Step 0 process updates */
//   };

//   let winnerModal = null;
//   if (winner) {
//     winnerModal = <div className="Game-winner">the winner is {winner} yay cool cool</div>;
//   }
//   return (
//     <>
//       <div className="Game-body">
//         <canvas id="game-canvas" width="800" height="800" />
//         {winnerModal}
//       </div>
//     </>
//   );
// };

// export default Game;
