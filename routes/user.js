const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.render("users/index.ejs", {
    users: allUsers,
  });
});

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const pantryData = user.pantry;
  res.render("users/show.ejs", {
    pantry: pantryData,
  });
});
module.exports = router;