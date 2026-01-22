const { Router } = require("express");
const authRoutes = require("./auth.js");
const collectionRoutes = require("./collection.js");
const userRoutes = require("./user.js")
const isSignedIn = require("../middleware/is-signed-in.js");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

// Example of protecting a route with custom middleware (isSignedIn)
router.use("/auth", authRoutes);
router.use("/collection", isSignedIn, collectionRoutes);
router.use("/users", isSignedIn, userRoutes)

module.exports = router;
