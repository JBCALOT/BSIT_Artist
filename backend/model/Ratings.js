const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({

},{timestamps: true}
);

const Ratings = mongoose.model("Ratings", ratingSchema );
module.exports = Ratings;
