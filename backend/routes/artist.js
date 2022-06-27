const express = require("express");
const router = express.Router();

const {
    store,
    update,
    getAll,
    dlt,
    getDetails,
} = require("../controller/ArtistController");

router.route("/").get(getAll);
router.route("/store").post(store);
router.route("/update/:id").patch(update);
router.route("/dlt/:id").delete(dlt);
router.route("/:id").get(getDetails);

module.exports = router;