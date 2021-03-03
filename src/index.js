var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var passport = require("passport");
//init env and express
dotenv.config();
const app = express();
//connect DB by env variable
mongoose.connect(
  `${process.env.START_MONGODB}${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}${process.env.MONGODB_END}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(
      "Connected Mongo DB  " +
        `${process.env.START_MONGODB}${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}${process.env.MONGODB_END}`
    );
  }
);
//middleware setup
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credential: true }));
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

app.get("/", (req, res) => {
  res.send("This is Levelup");
});

app.listen(4000, () => {
  console.log("Levelup Listening");
});
