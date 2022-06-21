const express = require("express");
const router = express.Router();

const {
    store,
    update,
    getAll,
    dlt,
} = require("../controller/TrackController");

router.route("/").get(getAll);
router.route("/store").post(store,getAll);
router.route("/update/:id").patch(update,getAll);
router.route("/dlt/:id").delete(dlt);

module.exports = router;
