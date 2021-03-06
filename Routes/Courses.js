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
module.exports = router;
