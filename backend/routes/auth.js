const express = require("express");
const { getProfile, login, register, logout } = require("../controller/UserController");
const { authenthicationCheck } = require("../middlewares/auth");
const router = express.Router();

router.route("/me").get(authenthicationCheck, getProfile);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(authenthicationCheck, logout);

module.exports = router;
