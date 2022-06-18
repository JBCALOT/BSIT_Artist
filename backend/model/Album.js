const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
   album_name: {
        type: String,
        required: [true, "Please Enter Album Name"],
      },
    producer: {
        type: mongoose.Schema.ObjectId,
        ref: "Producer",
        required: [true, "Please Enter Producer Name"],
      },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        required: [true, "Please Enter Artist name"],
      },
    duration: {
      type: String,
      required: [true, "Please Enter Album Duration"],
      },
    date_released: {
        type: String,
        required: true,
        //default: Date.now,
      }, 
},{timestamps: true}
);

const Album = mongoose.model("Album", albumSchema );
module.exports = Album;
