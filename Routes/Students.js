const express = require("express");
const Student = require("../Models/Student");
const router = express.Router();

// Get student list
router.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add student
router.post("/", async (req, res) => {
  console.log(req.body);
  const student = new Student({
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    dob: req.body.dob,
    school: req.body.school,
    current_credit: req.body.current_credit,
    joint_date: req.body.joint_date,
  });
  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get student by name
router.get("/:name", async (req, res) => {
  try {
    const student = await Student.findOne({
      firstname: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(student);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get student by ID
router.get("/id/:studentid", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentid);
    res.json(student);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete student
router.delete("/:studentid", async (req, res) => {
  try {
    const deletedStudent = await Student.deleteOne({
      _id: req.params.studentid,
    });
    res.json(deletedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update student
router.patch("/:studentid", async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: req.params.studentid },
      {
        $set: {
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          dob: req.body.dob,
          school: req.body.school,
          current_credit: req.body.current_credit,
          joint_date: req.body.joint_date,
        },
      }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
