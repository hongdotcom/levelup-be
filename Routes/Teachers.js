const express = require("express");
const Teacher = require("../Models/Teacher");
const router = express.Router();

// Get student list
router.get("/", async (req, res) => {
  try {
    const teacher = await Teacher.find();
    res.json(teacher);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add teacher
router.post("/", async (req, res) => {
  console.log(req.body);
  const teacher = new Teacher({
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    joint_date: req.body.joint_date,
  });
  try {
    const savedTeacher = await teacher.save();
    res.json(savedTeacher);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get teacher by name
router.get("/:name", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      firstname: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(teacher);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get teacher by ID
router.get("/id/:teacherid", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherid);
    res.json(teacher);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete teacher
router.delete("/:teacherid", async (req, res) => {
  try {
    const deleteTeacher = await Teacher.deleteOne({
      _id: req.params.teacherid,
    });
    res.json(deleteTeacher);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update teacher
router.patch("/:teacherid", async (req, res) => {
  try {
    const updatedTeacher = await Teacher.updateOne(
      { _id: req.params.teacherid },
      {
        $set: {
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          joint_date: req.body.joint_date,
        },
      }
    );
    res.json(updatedTeacher);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
