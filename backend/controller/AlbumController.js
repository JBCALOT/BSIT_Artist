const Album = require("../model/Album");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

//Create Album
exports.store = catchAsyncErrors(async (req, res, next) => {
  if (req.body.from === "android") {
    // const obj = JSON.parse(req.body.profile_picture)
    req.body.image = [
      {
        public_id: req.body.public_id,
        url: req.body.url,
      },
    ];
    //console.log(req.body.image);
  } else {
    let image = [];
    if (!req.body.image) {
      return next(new ErrorHandler("Please Select a Photo", 400));
    }
    if (typeof req.body.image === "string") {
      image.push(req.body.image);
    } else {
      image = req.body.image;
    }

    let imageLinks = [];

    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.v2.uploader.upload(image[i], {
        folder: "images",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.image = imageLinks;
  }
  let album;
  await Album.create(req.body);
  await Album.aggregate([
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

  //Get All album
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

  exports.getDetails = catchAsyncErrors(async (req, res, next) => {
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