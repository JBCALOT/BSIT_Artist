const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
   album_name: {
        type: mongoose.Schema.ObjectId,
        ref: "Album",
        required: [true, "Please Enter Album Name"],
      },
    producer_name: {
        type: mongoose.Schema.ObjectId,
        ref: "Producer",
        required: [true, "Please Enter Producer Name"],
      },
    artist_name: {
        type: mongoose.Schema.ObjectId,
        ref: "Album",
        required: [true, "Please Enter Artist name"],
      },
    duration: {
        type: String,
        required: [true, "Please Enter Duration"],
      },
    date_released: {
        type: Date,
        required: true,
        default: Date.now,
      }, 
},{timestamps: true}
);

const Album = mongoose.model("Album", albumSchema );
module.exports = Album;
