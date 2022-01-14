import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// importing models

const User = require("./models/User");

const UserAvatar = require("./models/UserAvatar");
const UserProfile = require("./models/UserProfile");
const UserAchievement = require("./models/UserAchievement");

const PairActivity = require("./models/PairActivity");
const PairAvatar = require("./models/PairAvatar");

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

router.get("/UserAvatar", (req, res) => {
  UserAvatar.find({ googleID: req.query.googleID }).then((avatarList: any) => {
    res.send(avatarList);
  });
});

router.get("/UserProfile", (req, res) => {
  UserProfile.find({ googleID: req.query.googleID }).then((userProfile: any) => {
    res.send(userProfile);
  });
});

router.get("/UserAchievement", (req, res) => {
  UserAchievement.find({ googleID: req.query.googleID }).then((userAchievement: String) => {
    res.send(userAchievement);
  });
});

router.get("/PairAvatar", (req, res) => {
  PairAvatar.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairAvatar: any) => {
    res.send(pairAvatar);
  });
});

router.get("/PairActivity", (req, res) => {
  PairActivity.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairActivity: any) => {
    res.send(pairActivity);
  });
});


export default router;
