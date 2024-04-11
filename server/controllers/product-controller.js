import { Product } from "../models/Product.js";
import { Vendor } from "../models/Vendor.js";

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      return res.status(200).json({
        data: products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  getProductById: async ({ params }, res) => {
    try {
      const product = await Product.findById({ _id: params.productId });
      console.log(product.images);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  createProduct: async (req, res) => {
    if (
      !req.body.title ||
      !req.body.vendor ||
      !req.body.description ||
      !req.body.condition ||
      !req.body.quantity ||
      !req.body.price ||
      !req.body.availability
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      try {
        const newProduct = await Product.create({
          ...req.body,
          productImage: req.file.path,
        }).then((_id) => {
          return Vendor.findOneAndUpdate(
            { _id: req.body.vendor },
            { $push: { products: _id } },
            { new: true }
          );
        });
        return res.status(201).json(newProduct);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  },

  updateProduct: async ({ params, body }, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: params.productId },
        body,
        {
          new: true,
        }
      );
      if (!product)
        return res
          .status(404)
          .json({ message: "Product not found" })
          .then(() => {});
      return res.status(200).json({ message: "Product updated" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  deleteProduct: async ({ params }, res) => {
    try {
      const product = await Product.findByIdAndDelete({
        _id: params.productId,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const vendor = await Vendor.findByIdAndUpdate(
        product.vendor,
        { $pull: { products: params.productId } },
        { new: true }
      );
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
      return res.status(200).json({ message: "Product successfully deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },
};

export default productController;
