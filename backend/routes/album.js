const express = require("express");
const router = express.Router();

const {
    store,
    getAll,
   update,
   dlt,
} = require("../controller/AlbumController");

router.route("/").get(getAll);
router.route("/store").post(store);
router.route("/update/:id").patch(update);
router.route("/dlt/:id").delete(dlt);

module.exports = router;