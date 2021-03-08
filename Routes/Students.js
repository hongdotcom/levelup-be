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
//insert checkpoint for student
router.patch("/insertstucheckpoint/:studentid", async (req, res) => {
  try {
    const insertedCheckpoint = await Student.updateOne(
      { _id: req.params.studentid },
      {
        $push: {
          checkpoint_earn: {
            project: req.body.checkpoint_earn.project,
            earn_date: req.body.checkpoint_earn.earn_date,
            level: req.body.checkpoint_earn.level,
            comment: req.body.checkpoint_earn.comment,
          },
        },
      }
    );
    // const student = await Student.findById(req.params.studentid);
    // student.checkpoint_earn.push({
    //   project: req.body.checkpoint_earn.project,
    //   earn_date: req.body.checkpoint_earn.earn_date,
    //   level: req.body.checkpoint_earn.level,
    //   comment: req.body.checkpoint_earn.comment,
    // });
    // const insertedCheckpoint = await student.save();

    res.json(req.body);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/removestucheckpoint/:studentid", async (req, res) => {
  const student = await Student.updateOne(
    {
      _id: req.params.studentid,
    },
    { $pull: { checkpoint_earn: { _id: "6045513ece742a8b7d2116f1" } } }
  );
  res.json(student);
});
router.get("/findcheckpoint/:studentid", async (req, res) => {
  const student = await Student.findById(req.params.studentid);
  res.json(student.checkpoint_earn);
});

module.exports = router;
