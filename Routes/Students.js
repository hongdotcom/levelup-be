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
//Update student basic info
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
            checkpoint_name: req.body.checkpoint_earn.checkpoint_name,
            percentage_completed: req.body.checkpoint_earn.percentage_completed,
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

    res.json(insertedCheckpoint);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete checkpoint for student
router.delete("/removestucheckpoint/:studentid", async (req, res) => {
  const student = await Student.updateOne(
    {
      _id: req.params.studentid,
    },
    { $pull: { checkpoint_earn: { _id: "6045513ece742a8b7d2116f1" } } }
  );
  res.json(student);
});
//show all checkpoint
router.get("/findcheckpoint/:studentid", async (req, res) => {
  const student = await Student.findById(req.params.studentid);
  res.json(student.checkpoint_earn);
});
//find last checkpoint
router.get("/lastcheckpoint/:studentid", async (req, res) => {
  const student = await Student.findById(req.params.studentid);
  const checkpoint = student.checkpoint_earn;
  checkpoint.sort(function compare(a, b) {
    return new Date(b.update_date) - new Date(a.update_date);
  });
  res.json(checkpoint[0]);
});
//get list of student in a class
router.get("/classstudent/:classid", async (req, res) => {
  // const student = await Student.find({
  //   schedule: { $elemMatch: { class_id: req.params.classid } },
  // });
  const student = await Student.find();
  const classStudent = [];
  student.forEach(function (stud) {
    stud.class_taken.forEach(function (item) {
      console.log(item);
      console.log(item.class_id);
      // console.log(req.params.classid);
      if (item.class_id == req.params.classid) {
        console.log("push");
        classStudent.push(stud);
      }
    });
  });

  res.json(classStudent);
});
//add classtake to student
router.patch("/insertclasstake/:studentid", async (req, res) => {
  try {
    const insertedClass = await Student.updateOne(
      { _id: req.params.studentid },
      {
        $push: {
          class_taken: {
            class_id: req.body.class_taken.class_id,
            class_date: req.body.class_taken.class_date,
            location: req.body.class_taken.location,
            attendance: req.body.class_taken.attendance,
          },
        },
      }
    );
    console.log(insertedClass);
    res.json(insertedClass);
  } catch (err) {
    res.json({ message: err });
  }
});
//add skill to student
router.patch("/insertskill/:studentid", async (req, res) => {
  try {
    const insertedSkill = await Student.updateOne(
      { _id: req.params.studentid },
      {
        $push: {
          skill_learn: {
            skill_name: req.body.skill_learn.skill_name,
            level: req.body.skill_learn.level,
            comment: req.body.skill_learn.comment,
          },
        },
      }
    );
    console.log(insertedSkill);
    res.json(insertedSkill);
  } catch (err) {
    res.json({ message: err });
  }
});
//show all skill
router.get("/findskill/:studentid", async (req, res) => {
  const student = await Student.findById(req.params.studentid);
  const skill = student.skill_learn;
  skill.sort(function compare(a, b) {
    return new Date(b.update_date) - new Date(a.update_date);
  });
  res.json(skill);
});
module.exports = router;
