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
  
  const album = await Album.create(req.body);
  /* await Album.aggregate([
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
    ]); */
    const status = {
      message: `Album Added`,
      success: true,
    }
    req.body.status = status
        next();
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
      //Longest album duration
      const long = await Album.findOne({}).sort({
        duration : -1
      });
return res.status(200).json({
      success: true,
      album,
      long,
    });
  });

//Get All album for guest
exports.getAllGuest = catchAsyncErrors(async (req, res, next) => {
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


//Edit Album
  exports.update = catchAsyncErrors(async (req, res, next) => {
    req.body.updated_at = Date.now();
    //let image = [];
    let album;

  try {
    for (let i = 0; i < album.image.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(album.image[i].public_id);
       req.body.image = { public_id: result.public_id, url: result.secure_url };
  }
      } catch (error) {
console.log(error);
//return next(new ErrorHandler(error, 400));
  }

const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "images",
  });        
  req.body.image = { public_id: result.public_id, url: result.secure_url };

    await Album.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    /* await Album.aggregate([
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
    ]); const status = {
      message: "Album Updated!",
      success: true,
    }
    req.body.status = status
        next();*/

     res.status(200).json({
       success: `Album successfully updated`,
       album,
     });
     next();
  });

//Delete Album
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
