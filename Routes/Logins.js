const express = require("express");
const Login = require("../Models/Login");
const router = express.Router();

// Get login list
router.get("/", async (req, res) => {
  try {
    const login = await Login.find();
    res.json(login);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add login
router.post("/", async (req, res) => {
  console.log(req.body);
  const login = new Login({
    username: req.body.username,
    email: req.body.email,
    hashPassword: req.body.hashPassword,
    role_id: req.body.role_id,
    related_id: req.body.related_id,
  });
  try {
    const savedLogin = await login.save();
    res.json(savedLogin);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get login by name
router.get("/:name", async (req, res) => {
  try {
    const login = await Login.findOne({
      username: new RegExp("^" + req.params.name + "$", "i"),
    });
    res.json(login);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get login by ID
router.get("/id/:loginid", async (req, res) => {
  try {
    const login = await Login.findById(req.params.loginid);
    res.json(login);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete login
router.delete("/:loginid", async (req, res) => {
  try {
    const deletedLogin = await Login.deleteOne({
      _id: req.params.loginid,
    });
    res.json(deletedLogin);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update login
router.patch("/:loginid", async (req, res) => {
  try {
    const updatedLogin = await Login.updateOne(
      { _id: req.params.loginid },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          hashPassword: req.body.hashPassword,
          role_id: req.body.role_id,
          related_id: req.body.related_id,
        },
      }
    );
    res.json(updatedLogin);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
