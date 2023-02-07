const asyncHandler = require("express-async-handler");
const Address = require("../models/address.model");

// @desc        Get address by id
// @route       GET request to /api/addresses/:id
// @access      public
const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  res.status(200).json(address);
});

// @desc        Get addresses by user id
// @route       GET request to /api/addresses/:user_id
// @access      private
const getAddressesByUserId = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });

  res.status(200).json(addresses);
});

// @desc        Create new address
// @route       POST request to /api/addresses/
// @access      private
const addNewAddress = asyncHandler(async (req, res) => {
  const address = {
    user: req.body.user_id,
    strada: req.body.strada,
    numarStrada: req.body.numarStrada,
    bloc: req.body.bloc,
    scara: req.body.scara,
    apartament: req.body.apartament,
  };

  if (address) {
    try {
      await Address.create(address);
      res.status(201).json({ message: "Address created" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Addres not created" });
    }
  }
});

// @desc        Delete address
// @route       POST request to /api/addresses/
// @access      private
const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    res.status(400).json({ message: "Address not found" });
    return;
  }

  await address.remove();
  res.status(200).json({ message: "Address deleted" });
});

module.exports = {
  getAddressById,
  getAddressesByUserId,
  addNewAddress,
  deleteAddress,
};
