const asyncHandler = require("express-async-handler");
const Whatsapp = require("../models/Whatsapp");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get Whatsapp Number
 * @route  /api/v1/whatsapp
 * @method GET
 * @access public
-----------------------------------*/

exports.getWhatsapp = asyncHandler(async (req, res) => {
  // Get Whatsapp From DB
  const whatsapp = await Whatsapp.find({});

  // Send Response To Client
  res.status(200).json(whatsapp);
});

/** -----------------------------------
 * @desc   Create New Whatsapp Number
 * @route  /api/v1/whatsapp
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createWhatsapp = asyncHandler(async (req, res, next) => {
  // Get Whatsapp Number From Request
  const { number } = req.body;

  const whatsapp = await Whatsapp.find({});

  // Check If There Is Link In Database
  if (whatsapp.length >= 1) {
    return next(new ApiError("There is whatsapp number already", 400));
  }

  // Create Whatsapp In DB
  const whatsappNumber = await Whatsapp.create({ number });

  // Send Response To Client
  res.status(201).json(whatsappNumber);
});

/** -----------------------------------
 * @desc   Update Whatsapp Number
 * @route  /api/v1/whatsapp/:id
 * @method PUT
 * @access private (Only Admin)
-----------------------------------*/

exports.updateWhatsapp = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;
  const { number } = req.body;

  // Get Whatsapp From DB And Update
  const whatsapp = await Whatsapp.findOneAndUpdate(
    { _id: id },
    { number },
    { new: true }
  );

  // Validation
  if (!whatsapp) {
    return next(new ApiError(`No whatsapp number for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(200).json(whatsapp);
});

/** -----------------------------------
 * @desc   Delete Whatsapp Number
 * @route  /api/v1/whatsapp/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteWhatsapp = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get whatsapp From DB And Delete
  const whatsapp = await Whatsapp.findByIdAndDelete(id);

  // Validation
  if (!whatsapp) {
    return next(new ApiError(`No whatsapp for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(204).send();
});
