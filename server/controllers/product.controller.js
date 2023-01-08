const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");

// @desc      Get product
// @route     GET /api/products
// @access    Private
const getProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const category = req.query.category?.toUpperCase();
  const query = req.query.q?.toLowerCase();

  // Get all the products without query
  if (!limit && !category && !query) {
    const products = await Product.find().lean();
    res.status(200).json(products);
  }
  // Query by limit
  else if (!category && !query && limit) {
    const products = await Product.find().limit(limit).lean();
    res.status(200).json(products);
  }
  // Query by limit and text
  else if (!category && limit && query) {
    const searchRegex = new RegExp(query, "i");
    const products = await Product.find({ name: searchRegex })
      .limit(limit)
      .lean();
    res.status(200).json(products);
  }
  // Query by category
  else if (category && !limit && !query) {
    const products = await Product.find({ category: category }).lean();
    res.status(200).json(products);
  }
});

// @desc      Get one product
// @route     GET /api/products/:id
// @access    Private
const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).lean();

  if (!product) {
    res.status(400).json({ message: "Product doesn't exist" });
    return;
  }

  await res.status(200).json(product);
});

// @desc      Set product
// @route     POST /api/products
// @access    Private
const createProduct = asyncHandler(async (req, res) => {
  const product = await {
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    preview: req.body.preview,
    ingredients: req.body.ingredients,
  };

  if (
    !req.body.category ||
    !req.body.name ||
    !req.body.price ||
    !req.body.preview
  ) {
    await res.status(400).json({
      message: "Error",
    });
    return;
  }

  await Product.create(product);

  await res.status(200).json({
    message: "product created",
  });
});

// @desc      Update product
// @route     PUT /api/products
// @access    Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Product doesn't exist" });
    return;
  }

  await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await res.status(200).json({ message: "Product updated!" });
});

// @desc      Delete product
// @route     DELETE /api/products
// @access    Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Product not found" });
    return;
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted" });
});

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
