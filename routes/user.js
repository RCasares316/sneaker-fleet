const { Router } = require("express");
const users = require("../controllers/users.js");
const User = require("../models/user.js");
const Collection = require("../models/collection.js");
const router = Router();

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.render("users/index.ejs", {
    users: allUsers,
  });
});

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collections = await Collection.find({
  owner: user._id,
});
res.render("users/show.ejs", {
  user,
  collections,
})
});

module.exports = router;