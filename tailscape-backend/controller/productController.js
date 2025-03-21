const Product = require("../model/productModel");
const {
  authenticateUser,
  checkAdminRole,
} = require("../middleware/authMiddleware");
// Initialize the Express app

// Middleware for parsing JSON bodies

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find product by ID
    const product = await Product.findById(id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product
    res.status(200).json({ product });
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.updateProduct = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.deleteProduct = [
  authenticateUser,
  checkAdminRole,
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];
