const User = require("../models/user.js");
const Collection = require("../models/collection.js");

const homeSneaker = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collections = await Collection.find({
    owner: user._id,
  });
  res.render("collection/index.ejs", { collections: collections });
};

const addSneaker = (req, res) => {
  res.render("collection/new.ejs", {
    errorMessage: null,
    formData: {},
  });
};

const postSneaker = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const newData = req.body;
    newData["owner"] = currentUser;
    const newCollection = new Collection(newData);
    await newCollection.save();
    res.redirect("/collection");
  } catch (err) {
    // Mongoose validation error
    if (err.name === "ValidationError") {
      res.render("collection/new.ejs", {
        errorMessage: "All required fields must be filled out.",
        formData: req.body, // so the user doesn't lose what they typed
      });
    } else {
      res.status(500).send(err.message);
    }
  }
};

const viewSneaker = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  res.render("collection/show.ejs", { collection: collection });
};

const editSneaker = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  console.log(collection);
  res.render("collection/edit.ejs", { collection: collection });
};

const repostSneaker = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  collection.set(req.body);
  await collection.save();
  res.redirect(`/collection/${req.params.collectionId}`);
};

const deleteSneaker = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const collection = await Collection.findById(req.params.collectionId);
  await collection.deleteOne();
  res.redirect("/collection");
};

module.exports = {
  homeSneaker,
  addSneaker,
  postSneaker,
  viewSneaker,
  editSneaker,
  repostSneaker,
  deleteSneaker,
};
