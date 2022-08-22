const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "This field is required"],
},
type: {
    type: String,
    required: true,
    enum: {
      values: ["Album", "Artist", "Track"],
    },
},
rating: {
    type: String,
    required: [true, "Rating description is required."],
  },
rating_value: {
    type: Number,
    required: [true, "Rating value is required."],
  },
},{timestamps: true}
);

const Ratings = mongoose.model("Ratings", ratingSchema );
module.exports = Ratings;
