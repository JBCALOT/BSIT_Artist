//Artist Controller
const Producer = require("../model/Producer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Add producer
exports.store = catchAsyncErrors(async (req, res, next) => {
    const producer = await Producer.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Producer has been successfully Added",
      producer,
    });
  });

//Get all producer
exports.getAll = catchAsyncErrors(async (req, res, next) => {
 const producer = await Producer.find();
 //console.log(producer);
    return res.status(200).json({
      success: true,
      producer,          
    });
  });       

 
//Edit Producer
exports.update = catchAsyncErrors(async (req, res, next) => { 
    await Producer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const producer = await Producer.find();
    return res.status(200).json({
      success: `Producer has been updated!`,
      producer,
    });
  });


//Delete
exports.dlt = catchAsyncErrors(async (req, res, next) => {
    const producer = await Producer.findById(req.params.id);
    await producer.remove();
    return res.status(200).json({
      success: `Producer deleted!`,
      id: req.params.id,
    });
  });