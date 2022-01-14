import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import NavBar from "./modules/NavBar";
import Skeleton from "./pages/Skeleton";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import Home from "./pages/Home";
import Garden from "./pages/Garden/Garden"
import "../utilities.css";

const App = () => {
  const [userId, setUserId] = useState<String>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (res: GoogleLoginResponse) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user: User) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <div>
      <NavBar />
      <Router>
        <Skeleton
          path="/"
          handleLogin={handleLogin as (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void}
          handleLogout={handleLogout}
          userId={userId}
        />
        <Home path="/home/" />
        <Garden path="/garden/" />
        <NotFound default={true} />
      </Router>
    </div>
  );
};

export default App;
