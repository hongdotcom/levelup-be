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
  `${process.env.MONGODB_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {}
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully Connected");
  console.log(mongoose.connection.readyState);
});
connection.on("error", (err) => {
  console.log("Cannot connect because " + err);
  console.log(mongoose.connection.readyState);
});

//Other middleware setup
app.use(express.json());
// app.use(express.urlencoded());
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
//root route register
app.get("/", (req, res) => {
  res.send("This is Levelup");
});

app.listen(4000, () => {
  console.log("Levelup Listening");
});
