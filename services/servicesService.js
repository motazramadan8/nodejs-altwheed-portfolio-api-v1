const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Service = require("../models/Services");
const ApiError = require("../utils/apiError");

/** -----------------------------------
 * @desc   Get All Services
 * @route  /api/v1/services
 * @method GET
 * @access public
-----------------------------------*/

exports.getServices = asyncHandler(async (req, res) => {
  // Get All Services From DB
  const services = await Service.find({});

  // Send Response To Client
  res.status(200).json(services);
});

/** -----------------------------------
 * @desc   Create New Service
 * @route  /api/v1/services
 * @method POST
 * @access private (Only Admin)
-----------------------------------*/

exports.createService = asyncHandler(async (req, res) => {
  // Get Service Name From Request
  const { title, description } = req.body;

  // Generate ID
  const serviceId = (await Service.count()) + 1;

  // Create Service In DB
  const service = await Service.create({
    id: serviceId,
    title,
    slug: slugify(title),
    description,
  });

  // Send Response To Client
  res.status(201).json({ data: service });
});

/** -----------------------------------
 * @desc   Update Specific Service
 * @route  /api/v1/services/:id
 * @method PUT
 * @access private (Only Admin)
-----------------------------------*/

exports.updateSpecificService = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;
  const { title, description } = req.body;

  // Get Service From DB And Update
  const service = await Service.findOneAndUpdate(
    { _id: id },
    { title, slug: slugify(title), description },
    { new: true }
  );

  // Validation
  if (!service) {
    return next(new ApiError(`No service for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(200).json({ service });
});

/** -----------------------------------
 * @desc   Delete Specific Service
 * @route  /api/v1/services/:id
 * @method DELETE
 * @access private (Only Admin)
-----------------------------------*/

exports.deleteSpecificService = asyncHandler(async (req, res, next) => {
  // Get The Id From Params
  const { id } = req.params;

  // Get Service From DB And Delete
  const service = await Service.findByIdAndDelete(id);

  // Validation
  if (!service) {
    return next(new ApiError(`No service for this id ${id}`, 404));
  }

  // Send Response To Client
  res.status(204).send();
});
