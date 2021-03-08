const express = require("express");
const Checkpoint = require("../Models/Checkpoint");
const router = express.Router();

// Get Checkpoint list
router.get("/", async (req, res) => {
  try {
    const checkpoint = await Checkpoint.find();
    res.json(checkpoint);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add Checkpoint
router.post("/", async (req, res) => {
  console.log(req.body);
  const checkpoint = new Checkpoint({
    checkpoint_name: req.body.checkpoint_name,
    description: req.body.description,
    badge_earn: req.body.badge_earn,
  });
  try {
    const savedCheckpoint = await checkpoint.save();
    res.json(savedCheckpoint);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get Checkpoint by name
router.get("/:name", async (req, res) => {
  try {
    const checkpoint = await Checkpoint.findOne({
      checkpoint_name: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(checkpoint);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get checkpoint by ID
router.get("/id/:checkpointid", async (req, res) => {
  try {
    const checkpoint = await Checkpoint.findById(req.params.checkpointid);
    res.json(checkpoint);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete checkpoint
router.delete("/:checkpointid", async (req, res) => {
  try {
    const deletedCheckpoint = await Checkpoint.deleteOne({
      _id: req.params.checkpointid,
    });
    res.json(deletedCheckpoint);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update course
router.patch("/:checkpointid", async (req, res) => {
  try {
    const updatedCheckpoint = await Checkpoint.updateOne(
      { _id: req.params.checkpointid },
      {
        $set: {
          checkpoint_name: req.body.checkpoint_name,
          description: req.body.description,
          badge_earn: req.body.badge_earn,
        },
      }
    );
    res.json(updatedCheckpoint);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
