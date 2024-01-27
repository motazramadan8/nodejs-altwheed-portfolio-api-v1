const asyncHandler = require("express-async-handler");
const Facebook = require("../models/Facebook");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get Facebook Link
 * @route  /api/v1/facebook
 * @method GET
 * @access public
-----------------------------------*/

exports.getFacebookLink = asyncHandler(async (req, res) => {
  // Get Facebook Link From DB
  const facebook = await Facebook.find({});

  // Send Response To Client
  res.status(200).json(facebook);
});

/** -----------------------------------
 * @desc   Create New Facebook Link
 * @route  /api/v1/facebook
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createFacebookLink = asyncHandler(async (req, res, next) => {
  // Get Facebook Link From Request
  const { link } = req.body;

  const facebook = await Facebook.find({});

  // Check If There Is Link In Database
  if (facebook.length >= 1) {
    return next(new ApiError("There is facebook link already", 400));
  }

  // Create Facebook Link In DB
  const facebookLink = await Facebook.create({ link });

  // Send Response To Client
  res.status(201).json({ facebookLink });
});

/** -----------------------------------
 * @desc   Update Facebook Link
 * @route  /api/v1/facebook/:id
 * @method PUT
 * @access private (Only Admin)
-----------------------------------*/

exports.updateFacebookLink = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;
  const { link } = req.body;

  // Get Facebook Link From DB And Update
  const facebookLink = await Facebook.findOneAndUpdate(
    { _id: id },
    { link },
    { new: true }
  );

  // Validation
  if (!facebookLink) {
    return next(new ApiError(`No facebook link for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(200).json({ facebookLink });
});

/** -----------------------------------
 * @desc   Delete Facebook Link
 * @route  /api/v1/facebook/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteFacebookLink = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get Facebook Link From DB And Delete
  const facebookLink = await Facebook.findByIdAndDelete(id);

  // Validation
  if (!facebookLink) {
    return next(new ApiError(`No facebook link for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(204).send();
});
