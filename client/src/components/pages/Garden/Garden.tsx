import React, { Component } from "react";

// import { drawCanvas } from "../../canvasManager";

import "../../../utilities.css";
import { RouteComponentProps } from "@reach/router";
// import "../../input";
// import "./Game.css";


// testing code 
// import Avatar from "../Avatar/Avatar.js";

import HealthBar from "./Representation/HealthBar";
// end testing code

type Props = RouteComponentProps & {};

const Garden = (props: Props) => {
  return (
    <div>
      <HealthBar health={58} />
      {/* <Avatar avatarName="Avatar" width="100" /> */}
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