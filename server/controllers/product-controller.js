import { Product } from "../models/Product.js";
import { Vendor } from "../models/Vendor.js";

import { handleImageUpload, handleImageDelete } from "../utils/fileUpload.js";

const checkFields = (body) => {
  if (
    !body.title ||
    !body.vendor ||
    !body.description ||
    !body.condition ||
    !body.quantity ||
    !body.price ||
    !body.availability
  )
    return false;
};

const getBase64 = (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  return dataURI;
};

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

  createProduct: async ({ body, file }, res) => {
    if (checkFields(body) == false) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    try {
      const dataURI = getBase64(file);
      const vendorId = body.vendor;

      const uploadFile = await handleImageUpload(dataURI, vendorId);

      const newProduct = await Product.create({
        ...body,
        productImage: {
          public_id: uploadFile.public_id,
          url: uploadFile.secure_url,
        },
      }).then((_id) => {
        return Vendor.findOneAndUpdate(
          { _id: body.vendor },
          { $push: { products: _id } },
          { new: true }
        );
      });
      return res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateProduct: async ({ params, body, file }, res) => {
    if (checkFields(body) == false) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    try {
      const product = await Product.findById(params.productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      let data = body;
      if (file) {
        let oldId = product.productImage.public_id;
        if (oldId) await handleImageDelete(oldId);

        let dataURI = getBase64(file);
        let newUpload = await handleImageUpload(dataURI, body.vendor);

        data.productImage = {
          public_id: newUpload.public_id,
          url: newUpload.secure_url,
        };
      }

      const newProduct = await Product.findOneAndUpdate(
        { _id: params.productId },
        data,
        { new: true }
      );

      return res.status(200).json(newProduct);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  },

  deleteProduct: async ({ params }, res) => {
    try {
      const product = await Product.findByIdAndDelete(params.productId);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      let public_id = product.productImage.public_id;
      if (public_id) handleImageDelete(public_id);

      let vendorId = product.vendor;
      const vendor = await Vendor.findByIdAndUpdate(
        vendorId,
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
