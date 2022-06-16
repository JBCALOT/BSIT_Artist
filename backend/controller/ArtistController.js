//Artist Controller
const Artist = require("../model/Artist");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Add Artist
exports.store = catchAsyncErrors(async (req, res, next) => {
    const artist = await Artist.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Artist has been successfully Added",
      artist,
    });
  });

//Get All artist
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const artist = await Artist.find();
    return res.status(200).json({
      success: true,
      artist,
    });
  });

//Edit
exports.update = catchAsyncErrors(async (req, res, next) => {
    await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const artist = await Artist.find();
    return res.status(200).json({
      success: "Artist updated!",
      artist,
    });
  });

//Delete
exports.dlt = catchAsyncErrors(async (req, res, next) => {
    const artist = await Artist.findById(req.params.id);
    await artist.remove();
    return res.status(200).json({
      success: `Artist deleted!`,
      id: req.params.id,
    });
  });