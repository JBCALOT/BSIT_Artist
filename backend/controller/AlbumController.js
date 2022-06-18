const Album = require("../model/Album");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mongoose = require("mongoose");

//Create Album
exports.store = catchAsyncErrors(async (req, res, next) => {
    await Album.create(req.body);
    const album = await Album.aggregate([
      {
        $lookup: {
          from: "producer",
          localField: "producer",
          foreignField: "_id",
          as: "producer",
        },
      },
      {
        $lookup: {
          from: "artist",
          localField: "artist",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $match: {
          artist: mongoose.Types.ObjectId(req.body.artist),
          producer: mongoose.Types.ObjectId(req.body.producer),
        },
      },
    ]);
    res.status(200).json({
      success: "Album Created!",
      album,
    });
  });

  //Get All artist
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    //await Album.find();
    const album = await Album.aggregate([
        {
          $lookup: {
            from: "producers",
            localField: "producer",
            foreignField: "_id",
            as: "producer",
          },
        },
        {
          $lookup: {
            from: "artists",
            localField: "artist",
            foreignField: "_id",
            as: "artist",
          },
        },
      ]);
    return res.status(200).json({
      success: true,
      album,
    });
  });

//Edit
  exports.update = catchAsyncErrors(async (req, res, next) => {
    await Album.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    const album = await Album.aggregate([
      {
        $lookup: {
          from: "producer",
          localField: "producer",
          foreignField: "_id",
          as: "producer",
        },
      },
      {
        $lookup: {
          from: "artist",
          localField: "artist",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $match: {
          artist: mongoose.Types.ObjectId(req.body.artist),
          producer: mongoose.Types.ObjectId(req.body.producer),
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: `Album successfully updated`,
      album,
    });
  });

//Delete
exports.dlt = catchAsyncErrors(async (req, res, next) => {
    const album = await Album.findById(req.params.id);
    await album.remove();
    return res.status(200).json({
      success: `Album deleted!`,
      id: req.params.id,
    });
  });