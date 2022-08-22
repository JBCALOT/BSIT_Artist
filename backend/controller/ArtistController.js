//Artist Controller
const Artist = require("../model/Artist");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");

//Add Artist
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
  let artist;
   artist = await Artist.create(req.body);
    return res.status(200).json({
      success: `Artist successfully Added`,
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

//Get All artist for guest
exports.getAllGuest = catchAsyncErrors(async (req, res) => {
  const artist = await Artist.find();
  return res.status(200).json({
    success: true,
    artist,
  });
});

//Edit
exports.update = catchAsyncErrors(async (req, res, next) => {
  req.body.updated_at = Date.now();
  //let image = [];
  let artist;
  /* if (req.body.from === "android") {
    //console.log(artist);
    if (req.body.url !== "") {
      try {
        //Delete the Current uploaded image on the cloudinary
        for (let i = 0; i < artist.image.length; i++) {
          const result = await cloudinary.v2.uploader.destroy(
            artist.image[i].public_id
          );
        }
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
      req.body.image = [
        {
          public_id: req.body.public_id,
          url: req.body.url,
        },
      ];
    }
  } else {
    if (req.body.hasOwnProperty("image")) {
      if (typeof req.body.image === "string") {
        image.push(req.body.image);
      } else {
        image = req.body.image;
      }
      
      try {
        //Delete the Current uploaded image on the cloudinary
        for (let i = 0; i < artist.image.length; i++) {
          const result = await cloudinary.v2.uploader.destroy(
            artist.image[i].public_id
          );
        }
        //Upload the new image/s
        for (let i = 0; i < image.length; i++) {
          const result = await cloudinary.v2.uploader.upload(image[i], {
            folder: "images",
          });
let imageLinks = [];
          imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        req.body.image = imageLinks;
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    }
  } */
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "images",
  });

  try {
    await cloudinary.v2.uploader.destroy(artist.image[0].public_id);
  } catch (error) {
    console.log(error);
  }
  req.body.image = { public_id: result.public_id, url: result.secure_url };

    await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      success: `Artist updated!`,
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

//Artist Details
exports.getDetails = catchAsyncErrors(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);
  return res.status(200).json({
    success: true,
    artist,
  });
});