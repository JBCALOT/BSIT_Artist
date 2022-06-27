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
        required: [true, "Please Enter Artist Name"],
      }, 
    track_name: {
        type: String,
        required: [true, "Please Enter Song Title"],
      },
    genre: {
        type: String,
        required: [true, "Please Enter Song Genre"],
      },
    duration: {
      minutes:{
        type: String,
        required: true,
      },
      seconds:{
        type: String,
        required: true,
      },
    }
},{timestamps: true}
);

const Track = mongoose.model("Track", trackSchema );
module.exports = Track;
