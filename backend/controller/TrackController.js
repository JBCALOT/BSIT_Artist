const Track = require("../model/Track");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mongoose = require("mongoose");

//Create Track
exports.store = catchAsyncErrors(async (req, res, next) => {
await Track.create(req.body);
   
const status = {
  message: "Track Added",
  success: true,
}
req.body.status = status
    next();
  });

  //Get All Tracks
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    //await Track.find();
    const track = await Track.aggregate([
        {
            $lookup: {
              from: "albums",
              localField: "album",
              foreignField: "_id",
              as: "album",
            },
          },
           {
            $lookup: {
              from: "artists",
              localField: "artist_name",
              foreignField: "_id",
              as: "artist",
            },
          }, 
      ]);

      const longtrack = await Track.findOne({}).sort({
        duration : -1
      }); 
    return res.status(200).json({
      success: req.body.status? req.body.status.success:true,
      message: req.body.status? req.body.status.message:null,
      track,
      longtrack,
    });
  });

//Edit
  exports.update = catchAsyncErrors(async (req, res, next) => {
    await Track.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    /* const track = await Track.aggregate([
        {
            $lookup: {
              from: "album",
              localField: "album",
              foreignField: "_id",
              as: "album",
            },
          },
          {
            $match: {
              album: mongoose.Types.ObjectId(req.body.album),
            },
          },
    ]);
    res.status(200).json({
      success: true,
      message: `Song Track Successfully Updated`,
      track,
    }); */
    const status = {
      message: "Song Track Updated!",
      success: true,
    }
    req.body.status = status
        next();
  });

//Delete
exports.dlt = catchAsyncErrors(async (req, res) => {
    const track = await Track.findById(req.params.id);
    await track.remove();
    return res.status(200).json({
      success: `Song Track deleted!`,
      id: req.params.id,
    });
  });