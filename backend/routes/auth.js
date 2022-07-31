const express = require("express");
const { getProfile } = require("../controller/UserController");
const { authenthicationCheck } = require("../middlewares/auth");
const router = express.Router();

router.route("/me").get(getProfile);

module.exports = router;
