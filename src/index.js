var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");

//import Login model for use
const Login = require("../Models/Login");
//Passport and strategy
var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
//init env and express
dotenv.config();
const app = express();

//connect DB by env variable----------------
mongoose.connect(
  `${process.env.MONGODB_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {}
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully Connected");
});
connection.on("error", (err) => {
  console.log("Cannot connect because " + err);
});
//-----------------------------

//Other middleware setup
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//For Google Login
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      Login.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        if (!doc) {
          const newLogin = new Login({
            googleId: profile.id,
            username: profile.name.givenName,
          });
          await newLogin.save();
          cb(null, newLogin);
          console.log("newLogin");
        } else {
          console.log(doc);
          cb(null, doc);
        }
      });
    }
  )
);

//For Twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
      consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
      callbackURL: "http://localhost:4000/auth/twitter/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      Login.findOne({ twitterId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        if (!doc) {
          const newLogin = new Login({
            googleId: profile.id,
            username: profile.username,
          });
          await newLogin.save();
          cb(null, newLogin);
          console.log("newLogin");
        } else {
          console.log(doc);
          cb(null, doc);
        }
      });
    }
  )
);

//For Github
passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "http://localhost:4000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      Login.findOne({ githubId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        if (!doc) {
          const newLogin = new Login({
            googleId: profile.id,
            username: profile.username,
          });
          await newLogin.save();
          cb(null, newLogin);
          console.log("newLogin");
        } else {
          console.log(doc);
          cb(null, doc);
        }
      });
    }
  )
);

//For Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: `${process.env.FACEBOOK_APP_ID}`,
      clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      Login.findOne({ twitterId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        if (!doc) {
          const newLogin = new Login({
            googleId: profile.id,
            username: profile.username,
          });
          await newLogin.save();
          cb(null, newLogin);
          console.log("newLogin");
        } else {
          console.log(doc);
          cb(null, doc);
        }
      });
    }
  )
);

//google action
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/teacher");
  }
);
//twitter action
app.get(
  "/auth/twitter",
  passport.authenticate("twitter", { scope: ["profile"] })
);
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/teacher");
  }
);
//github action
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile"] })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/teacher");
  }
);

//facebook action
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/teacher");
  }
);

//serial deserial data
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Login.findById(id, (err, doc) => {
    console.log(doc);
    return done(null, doc);
  });
});

// //Add Routes
const teacherRoute = require("../Routes/Teachers");
const studentRoute = require("../Routes/Students");
const courseRoute = require("../Routes/Courses");
const loginRoute = require("../Routes/Logins");
const checkpointRoute = require("../Routes/Checkpoints");
const caretakerRoute = require("../Routes/Caretakers");

// //Use Route as middleware
app.use("/teachers/", teacherRoute);
app.use("/students/", studentRoute);
app.use("/courses/", courseRoute);
app.use("/logins/", loginRoute);
app.use("/checkpoints/", checkpointRoute);
app.use("/caretaker", caretakerRoute);

app.get("/getuser", (req, res) => {
  console.log("this is getuser" + req.user);
  res.send(req.user);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("success");
  }
});

//root route register
app.get("/", (req, res) => {
  res.send("This is Levelup");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Levelup Listening 4000");
});
