const asyncHandler = require("express-async-handler");
const Gmail = require("../models/Gmail");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get Gmail
 * @route  /api/v1/gmail
 * @method GET
 * @access public
-----------------------------------*/

exports.getGmail = asyncHandler(async (req, res) => {
  // Get Gmail From DB
  const gmail = await Gmail.find({});

  // Send Response To Client
  res.status(200).json(gmail);
});

/** -----------------------------------
 * @desc   Create New Gmail
 * @route  /api/v1/gmail
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createGmail = asyncHandler(async (req, res, next) => {
  // Get Gmail From Request
  const { email } = req.body;

  const gmail = await Gmail.find({});

  // Check If There Is gmaik In Database
  if (gmail.length >= 1) {
    return next(new ApiError("There is gmail already", 400));
  }

  // Create Gmail In DB
  const gmailAccount = await Gmail.create({ email });

  // Send Response To Client
  res.status(201).json(gmailAccount);
});

/** -----------------------------------
 * @desc   Update Gmail
 * @route  /api/v1/gmail/:id
 * @method PUT
 * @access private (Only Admin)
-----------------------------------*/

exports.updateGmail = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;
  const { email } = req.body;

  // Get Gmail From DB And Update
  const gmail = await Gmail.findOneAndUpdate(
    { _id: id },
    { email },
    { new: true }
  );

  // Validation
  if (!gmail) {
    return next(new ApiError(`No gmail for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(200).json(gmail);
});

/** -----------------------------------
 * @desc   Delete Gmail
 * @route  /api/v1/gmail/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteGmail = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get Gmail From DB And Delete
  const gmail = await Gmail.findByIdAndDelete(id);

  // Validation
  if (!gmail) {
    return next(new ApiError(`No gmail for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(204).send();
});
