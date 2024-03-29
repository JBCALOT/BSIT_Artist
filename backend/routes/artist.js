const express = require("express");
const router = express.Router();
const { authenthicationCheck } = require("../middlewares/auth");
const {
    store,
    update,
    getAll,
    getAllGuest,
    dlt,
    getDetails,
} = require("../controller/ArtistController");

router.route("/guest/").get(getAllGuest);
router.route("/").post(authenthicationCheck,getAll);
router.route("/store").post(authenthicationCheck, store);
router.route("/update/:id").patch(authenthicationCheck, update, getAll);
router.route("/dlt/:id").delete(authenthicationCheck,dlt);
router.route("/:id").get(getDetails);

module.exports = router;