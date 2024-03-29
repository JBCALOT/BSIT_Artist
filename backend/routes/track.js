const express = require("express");
const router = express.Router();
const { authenthicationCheck } = require("../middlewares/auth");
const {
    store,
    update,
    getAll,
    dlt,
} = require("../controller/TrackController");

router.route("/").post(authenthicationCheck,getAll);
router.route("/store").post(authenthicationCheck, store,getAll);
router.route("/update/:id").patch(authenthicationCheck, update,getAll);
router.route("/dlt/:id").delete(authenthicationCheck, dlt);

module.exports = router;
