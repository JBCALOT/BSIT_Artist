const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, "Please Enter First name"],
      },
    l_name: {
        type: String,
        required: [true, "Please Enter Last Name"],
      },
    gender: {
        type: String,
        required: [true, "Please Enter Gender"],
      },
    birthday: {
        type: String,
        required: [true, "Please Enter Birthday"],
      },
    info: {
        type: String,
        required: [true, "Please Enter Artist's Additional Info"],
      },

},{timestamps: true}

);

const Artist = mongoose.model("Artist", artistSchema );
module.exports = Artist;
