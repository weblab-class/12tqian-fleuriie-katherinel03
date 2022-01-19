const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const UserProfile = require("./models/userprofile");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "714676168299-nil4moo5m1o2q1v79lq9rnloep1jn5uh.apps.googleusercontent.com";
// const CLIENT_ID = "591152966434-capsaasb8625fhqqbmpnudssj9n8t2p0.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  console.log('getorcreateuser start')
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleID: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleID: user.sub,
    });
    const newUserProfile = new UserProfile({
      googleID: user.sub,
      currentAvatarID: 0,
      currency: 0,
      userName: user.name,
    });
    newUserProfile.save();
    return newUser.save();
  });
}

function login(req, res) {
  console.log('calling login')
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      console.log('req.session.user')
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
