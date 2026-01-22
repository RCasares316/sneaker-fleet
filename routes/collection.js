const { Router } = require("express");
const controllers = require("../controllers/collection.js");
const User = require("../models/user.js");
const Collection = require("../models/collection.js");
const router = Router();

//Routes
router.get("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collections = await Collection.find({
    owner: user._id,
  });
  res.render("collection/index.ejs", { collections: collections });
});

router.get("/new", (req, res) => {
  res.render("collection/new.ejs");
});

router.post("/", async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  const newData = req.body;
  newData["owner"] = currentUser;
  const newCollection = new Collection(newData);
  await newCollection.save();
  res.redirect("/collection");
});

router.get("/:collectionId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  res.render("collection/show.ejs", { collection: collection });
});

router.get("/:collectionId/edit", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  console.log(collection)
  res.render("collection/edit.ejs", { collection: collection });
});

router.put("/:collectionId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  collection.set(req.body);
  console.log(collection);
  await collection.save();
  res.redirect(`/collection/${req.params.collectionId}`);
});

router.delete("/:collectionId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  await collection.deleteOne()
  res.redirect("/collection");
});

module.exports = router;
