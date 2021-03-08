const express = require("express");
const Caretaker = require("../Models/Caretaker");
const router = express.Router();

// Get Caretaker list
router.get("/", async (req, res) => {
  try {
    const caretaker = await Caretaker.find();
    res.json(caretaker);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add caretaker
router.post("/", async (req, res) => {
  console.log(req.body);
  const caretaker = new Caretaker({
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    register_date: req.body.register_date,
  });
  try {
    const savedCaretaker = await caretaker.save();
    res.json(savedCaretaker);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get caretaker by name
router.get("/:name", async (req, res) => {
  try {
    const caretaker = await Caretaker.findOne({
      firstname: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(caretaker);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get caretaker by ID
router.get("/id/:caretakerid", async (req, res) => {
  try {
    const caretaker = await Caretaker.findById(req.params.caretakerid);
    res.json(caretaker);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete caretaker
router.delete("/:caretakerid", async (req, res) => {
  try {
    const deletedCaretaker = await Caretaker.deleteOne({
      _id: req.params.checkpointid,
    });
    res.json(deletedCaretaker);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update caretaker
router.patch("/:caretakerid", async (req, res) => {
  try {
    const updatedCaretaker = await Caretaker.updateOne(
      { _id: req.params.caretakerid },
      {
        $set: {
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          register_date: req.body.register_date,
        },
      }
    );
    res.json(updatedCaretaker);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
