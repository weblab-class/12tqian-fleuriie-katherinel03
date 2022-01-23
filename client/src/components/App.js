import React, { useState, useEffect } from "react";
import { Router, Location } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Garden from "./pages/Garden/Garden.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile/Profile.js";
import Shop from "./pages/Shop/Shop.js";
import ScrollToTop from "./ScrollToTop.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      console.log(user);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
      <div className="App-container">
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
        />
        <Router role="group" primary={false}>
{/* setting role to group allows the css in app.css to force the div 
created by router to be the whole screen */}
          <ScrollToTop path="/">
          <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <Profile path="/profile/" />
          <Garden path="/garden/" />
          <Shop path="/shop/" />
          <NotFound default />
          </ScrollToTop>
        </Router>
      </div>
  );
}

export default App;
