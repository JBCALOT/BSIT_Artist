const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
   album: {
        type: mongoose.Schema.ObjectId,
        ref: "Album",
        required: [true, "Please Enter Album"],
      },
    artist_name: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        required: [true, "Please Enter Artist name"],
      },  
    track_name: {
        type: String,
        required: [true, "Please Enter Title"],
      },
    genre: {
        type: String,
        required: [true, "Please Enter Genre"],
      },
    duration: {
        type: Number,
        required: [true, "Please Enter Song Duration"],
      },
},{timestamps: true}
);

const Track = mongoose.model("Track", trackSchema );
module.exports = Track;
