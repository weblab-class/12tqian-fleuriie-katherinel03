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
const UserGarden = require("./models/usergarden");
const UserProfile = require("./models/userprofile");
const UserAchievement = require("./models/userachievement");

const PairActivity = require("./models/pairactivity");
const PairProfile = require("./models/pairprofile");
const PairRepresentation = require("./models/pairrepresentation");

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

router.get("/user", (req, res) => {
  User.findById(req.query.googleID).then((user) => {
    res.send(user);
  });
});

router.get("/usermany", (req, res) => {
  User.find({ googleID: req.query.googleID }).then((users) => {
    res.send(users);
  });
});

router.get("/useravatar", (req, res) => {
  UserAvatar.find({ googleID: req.query.googleID }).then((avatar) => {
    res.send(avatar);
  });
});

router.get("/usergarden", (req, res) => {
  UserGarden.find({ googleID: req.query.googleID }).then((gardens) => {
    res.send(gardens);
  });
});

router.get("/userprofile", (req, res) => {
  UserProfile.findOne({ googleID: req.query.googleID }).then((userProfile) => {
    res.send(userProfile);
  });
});

router.get("/pairrepresentation", (req, res) => {
  PairRepresentation.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairRepresentation) => {
    res.send(pairRepresentation);
  });
});

router.get("/pairrepresentationall", (req, res) => {
  PairRepresentation.find({
    userGoogleID: req.query.userGoogleID,
  }).then((pairRepresentation) => {
    res.send(pairRepresentation);
  });
});

router.get("/userachievement", (req, res) => {
  UserAchievement.find({ googleID: req.query.googleID }).then((userAchievement) => {
    res.send(userAchievement);
  });
});

router.get("/pairprofile", (req, res) => {
  PairProfile.find({
    userGoogleID: req.query.userGoogleID,
  }).then((pairProfiles) => {
    res.send(pairProfiles);
  });
});

router.get("/pairprofilename", (req, res) => {
  PairProfile.find({
    userGoogleID: req.query.userGoogleID,
    pairName: req.query.pairName,
  }).then((pairProfiles) => {
    res.send(pairProfiles);
  });
});


router.get("/pairprofileone", (req, res) => {
  PairProfile.findOne({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairProfile) => {
    res.send(pairProfile);
  });
});

router.get("/pairactivity", (req, res) => {
  PairActivity.find({
    userGoogleID: req.query.userGoogleID,
    otherGoogleID: req.query.otherGoogleID,
  }).then((pairActivity) => {
    const sortedActivities = pairActivity.sort((a, b) => new Date(b.activityTime) - new Date(a.activityTime));
    res.send(sortedActivities);
    // res.send(pairActivity);
  });
});

router.get("/pairactivityall", (req, res) => {
  PairActivity.find({
    googleID: req.query.googleID,
  }).then((pairActivity) => {
    res.send(pairActivity);
  });
});

router.post("/userachievement", auth.ensureLoggedIn, (req, res) => {
  const newUserAchievement = UserAchievement({
    googleID: req.body.googleID,
    achievementID: req.body.achievementID,
    achievementDate: req.body.achievementDate,
  });
  newUserAchievement.save().then(date => {
    res.send(data);
    socketManager.getIo().emit("newUserAchievement", {});
  });
});

router.post("/usergarden", auth.ensureLoggedIn, (req, res) => {
  const newUserGarden = UserGarden({
    googleID: req.body.googleID,
    gardenID: req.body.gardenID,
  });
  newUserGarden.save().then(data => {
    res.send(data);
    socketManager.getIo().emit("newUserGarden", {});
  })
});

router.post("/useravatar", auth.ensureLoggedIn, (req, res) => {
  const newUserAvatar = UserAvatar({
    googleID: req.body.googleID,
    avatarID: req.body.avatarID,
  });
  newUserAvatar.save().then(data => {
    res.send(data);
    socketManager.getIo().emit("newUserAvatarUpdate", {});
  })
});

router.post("/pairrepresentation", auth.ensureLoggedIn, (req, res) => {
  const newPairRepresentation = PairRepresentation({
    userGoogleID: req.body.userGoogleID,
    otherGoogleID: req.body.otherGoogleID,
    representationID: req.body.representationID,
  });
  newPairRepresentation.save().then(data => {
    res.send(data);
    socketManager.getIo().emit("newPairRepresentationUpdate", {});
  });
});

router.post("/userprofileupdate", auth.ensureLoggedIn, (req, res) => {
  UserProfile.findOneAndUpdate(req.body.userProfile, req.body.update).then(data => {
    res.send(data);
    socketManager.getIo().emit("newUserProfileUpdate", {});
  });
});

router.post("/pairprofileupdate", auth.ensureLoggedIn, (req, res) => {
  PairProfile.findOneAndUpdate(req.body.pairProfile, req.body.update).then(data => {
    res.send(data);
    socketManager.getIo().emit("newPairProfileUpdate", {});
  });
});

router.post("/userprofileupdate", auth.ensureLoggedIn, (req, res) => {
  UserProfile.findOneAndUpdate(req.body.userProfile, req.body.update).then(data => res.send(data));
});

router.post("/userprofiledelete", auth.ensureLoggedIn, (req, res) => {
  UserProfile.deleteMany(req.body).then((data) => {
    res.send(data);
    socketManager.getIo().emit("deletion", data);
  });
});

router.post("/pairactivitydelete", auth.ensureLoggedIn, (req, res) => {
  PairActivity.deleteMany(req.body).then((data) => {
    res.send(data);
    socketManager.getIo().emit("deletion", data);
  });
});

router.post("/pairrepresentationdelete", auth.ensureLoggedIn, (req, res) => {
  PairRepresentation.deleteMany(req.body).then((data) => {
    res.send(data);
    socketManager.getIo().emit("deletion", data);
  });
});

router.post("/pairprofiledelete", auth.ensureLoggedIn, (req, res) => {
  PairProfile.deleteMany(req.body).then((data) => {
    res.send(data);
    socketManager.getIo().emit("deletion", data);
  });
});

router.post("/userprofile", auth.ensureLoggedIn, (req, res) => {
  const newUserProfile = UserProfile({
    googleID: req.body.googleID,
    currentAvatarID: req.body.currentAvatarID,
    currentGardenID: req.body.currentGardenID,
    currency: req.body.currency,
    userName: req.body.userName,
    dateCreated: String(new Date()), // these are just gonna be hardcoded cause i'm lazy
    totalCurrency: 0, // technical ftw
  });
  newUserProfile.save().then(data => res.send(data));
});

router.post("/pairactivity", auth.ensureLoggedIn, (req, res) => {
  const newPairActivity = new PairActivity({
    userGoogleID: req.body.userGoogleID,
    otherGoogleID: req.body.otherGoogleID,
    activityName: req.body.activityName,
    activityTime: req.body.activityTime,
  });
  newPairActivity.save().then(data => {
    res.send(data)
    socketManager.getIo().emit("newPairActivity", newPairActivity);
  });
});

router.post("/pairprofile", auth.ensureLoggedIn, (req, res) => {
  const newPairProfile = new PairProfile({
    userGoogleID: req.body.userGoogleID,
    otherGoogleID: req.body.otherGoogleID,
    currentRepresentationID: req.body.currentRepresentationID,
    totalExperience: req.body.totalExperience,
    goalFrequency: req.body.goalFrequency,
    pairName: req.body.pairName,
  });
  newPairProfile.save().then(data => {
    res.send(data)
    socketManager.getIo().emit("newPairProfile", newPairProfile);
  });
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
