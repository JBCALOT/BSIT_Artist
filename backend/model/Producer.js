const mongoose = require("mongoose");

const producerSchema = mongoose.Schema({
    producer_name: {
        type: String,
        required: [true, "Please Enter Producer name"],
      },
    website: {
        type: String,
        required: [true, "Please Enter Website"],
      },
    social_media: {
        type: String,
        required: [true, "Please Enter Social Media"],
      },

},{timestamps: true}
);

const Producer = mongoose.model("Producer", producerSchema );
module.exports = Producer;
