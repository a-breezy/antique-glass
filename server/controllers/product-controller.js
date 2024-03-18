import { Product } from "../models/Product.js";
import { Vendor } from "../models/Vendor.js";

const productController = {
  // get all products
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

  // get single product
  getProductById: async ({ params }, res) => {
    try {
      const product = await Product.findById({ _id: params.productId });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: error.message });
    }
  },

  // create new product
  createProduct: async ({ body }, res) => {
    if (
      !body.title ||
      !body.vendor ||
      !body.description ||
      !body.condition ||
      !body.quantity ||
      !body.price ||
      !body.availability
    ) {
      return res.status(400).json({
        message:
          "Send all required fields: title, availability, price, and quantity",
      });
    } else {
      try {
        const newProduct = await Product.create(body).then((_id) => {
          return Vendor.findOneAndUpdate(
            { _id: body.vendor },
            { $push: { products: _id } },
            { new: true }
          );
        });
        return res.status(201).json(newProduct);
      } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
      }
    }
  },

  //update product
  updateProduct: async ({ params, body }, res) => {
    try {
      const product = await Product.findOneAndUpdate({ _id: params.productId }, body, {
        new: true,
      });
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

  //delete product
  deleteProduct: async ({ params }, res) => {
    try {
      const product = await Product.findByIdAndDelete({ _id: params.productId });
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
