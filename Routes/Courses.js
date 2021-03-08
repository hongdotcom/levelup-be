const express = require("express");
const Course = require("../Models/Course");
const router = express.Router();

// Get course list
router.get("/", async (req, res) => {
  try {
    const course = await Course.find();
    res.json(course);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add course
router.post("/", async (req, res) => {
  console.log(req.body);
  const course = new Course({
    course_name: req.body.course_name,
    description: req.body.description,
    duration: req.body.duration,
  });
  try {
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get course by name
router.get("/:name", async (req, res) => {
  try {
    const course = await Course.findOne({
      course_name: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(course);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get course by ID
router.get("/id/:courseid", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseid);
    res.json(course);
  } catch (err) {
    res.json({ message: err });
  }
});
// Delete course
router.delete("/:courseid", async (req, res) => {
  try {
    const deletedCourse = await Course.deleteOne({
      _id: req.params.courseid,
    });
    res.json(deletedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});
//Update course
router.patch("/:courseid", async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.courseid },
      {
        $set: {
          course_name: req.body.course_name,
          description: req.body.description,
          duration: req.body.duration,
        },
      }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});
//insert schedule for course
router.patch("/insertschedule/:courseid", async (req, res) => {
  try {
    const insertedSchedule = await Course.updateOne(
      { _id: req.params.courseid },
      {
        $push: {
          schedule: {
            class_date: req.body.schedule.class_date,
            location: req.body.schedule.location,
          },
        },
      }
    );
    res.json(insertedSchedule);
  } catch (err) {
    res.json({ message: err });
  }
});
//Get current month schedule
router.get("/currentschedule/:mth", async (req, res) => {
  const course1 = await Course.findById("604340606ff0fb11bcd77ed6");
  const course = await Course.find();
  const schedule = [];
  console.log(Array.isArray(course1.schedule));
  course.forEach(function (c) {
    c.schedule.forEach(function (item) {
      console.log(item.class_date.getMonth() + 1);
      console.log(req.params.mth);
      if (item.class_date.getMonth() + 1 == req.params.mth) {
        console.log("push");
        schedule.push(item);
      }
    });
  });
  res.json(schedule);
});
module.exports = router;
