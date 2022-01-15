/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const UserAvatar = require("./models/useravatar");
const UserProfile = require("./models/userprofile");
const UserAchievement = require("./models/userachievement");

const PairActivity = require("./models/pairactivity");
const PairAvatar = require("./models/pairavatar");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case

router.get("/useravatar", (req, res) => {
  UserAvatar.find({ googleID: req.query.googleID }).then((avatarList) => {
    res.send(avatarList);
  });
});

router.get("/userprofile", (req, res) => {
  UserProfile.find({ googleID: req.query.googleID }).then((userProfile) => {
    res.send(userProfile);
  });
});

router.get("/userachievement", (req, res) => {
  UserAchievement.find({ googleID: req.query.googleID }).then((userAchievement) => {
    res.send(userAchievement);
  });
});

router.get("/pairavatar", (req, res) => {
  PairAvatar.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairAvatar) => {
    res.send(pairAvatar);
  });
});

router.get("/pairactivity", (req, res) => {
  PairActivity.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairActivity) => {
    res.send(pairActivity);
  });
});

router.post("/pairactivity", auth.ensureLoggedIn, (req, res) => {
  const newPairActivity = new PairActivity({
    userGoogleID: req.body.userGoogleID,
    otherGoogleID: req.body.otherGoogleID,
    activityName: req.body.activityName,
    activityTime: req.body.activityTime,
  });
  newPairActivity.save().then(data => res.send(data));
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
