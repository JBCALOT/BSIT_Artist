const express = require("express");
const router = express.Router();
const { authenthicationCheck } = require("../middlewares/auth");

const {
    store,
    update,
    getAll,
    dlt,
} = require("../controller/ProducerController");

router.route("/").get(getAll);
router.route("/store").post( authenthicationCheck, store);
router.route("/update/:id").patch(authenthicationCheck, update);
router.route("/dlt/:id").delete( authenthicationCheck, dlt);

module.exports = router;
