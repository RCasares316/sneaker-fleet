const { Router } = require("express");
const controllers = require("../controllers/collection.js");
const User = require("../models/user.js");
const Collection = require("../models/collection.js");
const router = Router();

//Routes
router.get("/", controllers.homeSneaker);
router.get("/new", controllers.addSneaker);
router.post("/", controllers.postSneaker);
router.get("/:collectionId", controllers.viewSneaker);
router.get("/:collectionId/edit", controllers.editSneaker);
router.put("/:collectionId", controllers.repostSneaker);
router.delete("/:collectionId", controllers.deleteSneaker);

module.exports = router;
