const asyncHandler = require("express-async-handler");
const Linkedin = require("../models/Linkedin");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get Linkedin Link
 * @route  /api/v1/linkedin
 * @method GET
 * @access public
-----------------------------------*/

exports.getLinkedinLink = asyncHandler(async (req, res) => {
  // Get Linkedin Link From DB
  const linkedin = await Linkedin.find({});

  // Send Response To Client
  res.status(200).json(linkedin);
});

/** -----------------------------------
 * @desc   Create New Linkedin Link
 * @route  /api/v1/linkedin
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createLinkedinLink = asyncHandler(async (req, res, next) => {
  // Get Linkedin Link From Request
  const { link } = req.body;

  const linkedin = await Linkedin.find({});

  // Check If There Is Link In Database
  if (linkedin.length >= 1) {
    return next(new ApiError("There is linkedin link already", 400));
  }

  // Create Linkedin Link In DB
  const linkedinLink = await Linkedin.create({ link });

  // Send Response To Client
  res.status(201).json({ linkedinLink });
});

/** -----------------------------------
 * @desc   Update Linkedin Link
 * @route  /api/v1/linkedin/:id
 * @method PUT
 * @access private (Only Admin)
-----------------------------------*/

exports.updateLinkedinLink = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;
  const { link } = req.body;

  // Get Linkedin Link From DB And Update
  const linkedinLink = await Linkedin.findOneAndUpdate(
    { _id: id },
    { link },
    { new: true }
  );

  // Validation
  if (!linkedinLink) {
    return next(new ApiError(`No linkedin link for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(200).json({ linkedinLink });
});

/** -----------------------------------
 * @desc   Delete Linkedin Link
 * @route  /api/v1/linkedin/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteLinkedinLink = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get Linkedin Link From DB And Delete
  const linkedinLink = await Linkedin.findByIdAndDelete(id);

  // Validation
  if (!linkedinLink) {
    return next(new ApiError(`No linkedin link for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(204).send();
});
